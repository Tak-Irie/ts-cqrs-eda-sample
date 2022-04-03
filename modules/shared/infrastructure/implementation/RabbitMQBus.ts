import amqp from "amqplib";

import { EventData } from "../../../shared/domain/_Event";
import {
  EventBus,
  SubscribeArg,
  Subscriber,
  UnsubscribeArg,
  PublishArg,
} from "../EventBus";
import { serializeJSON, deserializeJSON } from "../../util/json";

type RabbitMQConstructor = {
  uri: string;
  subscriberGroup: string;
};

type ProcessMessage = {
  message: amqp.ConsumeMessage;
  channel: amqp.ConfirmChannel;
};
class RabbitMQBus<EVENT extends EventData> implements EventBus<EVENT> {
  private subscriberGroup: string;
  private subscribersByTopic: Map<string, Array<Subscriber<EVENT>>>;
  private initialization;

  constructor({ uri, subscriberGroup }: RabbitMQConstructor) {
    this.subscriberGroup = subscriberGroup;
    this.subscribersByTopic = new Map();
    this.initialization = amqp.connect(uri).then(async (connection) => {
      const channel = await connection.createConfirmChannel();
      channel.assertExchange("domain-events", "direct");
      channel.assertQueue(this.subscriberGroup, { durable: true });
      channel.consume(
        this.subscriberGroup,
        (message) => {
          if (message !== null) this.processMessage({ message, channel });
        },
        { noAck: false }
      );
      return channel;
    });
  }

  async subscribe({ eventType, subscriber }: SubscribeArg<EVENT>) {
    const channel = await this.initialization;

    channel.bindQueue(this.subscriberGroup, "domain-events", eventType);
    const gotSubscribers = this.getSubscribers(eventType);
    const concatSubscriber = gotSubscribers.concat([subscriber]);

    this.subscribersByTopic.set(eventType, concatSubscriber);
  }

  async unsubscribe({ eventType, subscriber }: UnsubscribeArg<EVENT>) {
    const gotSubscribers = this.getSubscribers(eventType);
    gotSubscribers.splice(gotSubscribers.indexOf(subscriber), 1);
    this.subscribersByTopic.set(eventType, gotSubscribers);
  }

  async publish({ eventType, event }: PublishArg<EVENT>) {
    const channel = await this.initialization;
    const json = serializeJSON(event);
    return new Promise<void>((resolve, reject) =>
      channel.publish(
        "domain-events",
        eventType,
        Buffer.from(json),
        { persistent: true },
        (error) => (error ? reject(error) : resolve())
      )
    );
  }

  async processMessage({ message, channel }: ProcessMessage) {
    const topic = message.fields.routingKey;
    const messageContent = deserializeJSON(message.content);

    await Promise.all(
      this.getSubscribers(topic).map(
        (subscriber: any) =>
          new Promise((resolve) =>
            setTimeout(() => {
              Promise.resolve(subscriber(messageContent)).then(resolve);
            })
          )
      )
    );
    channel.ack(message);
  }

  getSubscribers(topic: string) {
    return this.subscribersByTopic.get(topic) || [];
  }
}

export { RabbitMQBus };
