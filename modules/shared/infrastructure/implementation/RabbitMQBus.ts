import amqp from "amqplib";

import { serializeJSON, deserializeJSON } from "../../util/json";

export class RabbitMQBus {
  private initialization;
  private subscriberGroup;
  private subscribersByTopic;

  constructor(connectionString: string, subscriberGroup = "default") {
    this.subscriberGroup = subscriberGroup;
    this.subscribersByTopic = new Map();
    this.initialization = amqp
      .connect(connectionString)
      .then(async (connection) => {
        const channel = await connection.createConfirmChannel();
        channel.assertExchange("domain-events", "direct");
        channel.assertQueue(this.subscriberGroup, { durable: true });
        channel.consume(
          this.subscriberGroup,
          (message) => this.processMessage(message, channel),
          { noAck: false }
        );
        return channel;
      });
  }

  async subscribe(topic: any, subscriber: any) {
    const channel = await this.initialization;
    channel.bindQueue(this.subscriberGroup, "domain-events", topic);
    const newSubscribers = this.getSubscribers(topic).concat([subscriber]);
    this.subscribersByTopic.set(topic, newSubscribers);
  }

  unsubscribe(topic: any, subscriber: any) {
    const subscribers = this.getSubscribers(topic);
    subscribers.splice(subscribers.indexOf(subscriber), 1);
    this.subscribersByTopic.set(topic, subscribers);
  }

  async publish(topic: string, messageContent: any) {
    const channel = await this.initialization;
    const json = serializeJSON(messageContent);
    return new Promise<void>((resolve, reject) =>
      channel.publish(
        "domain-events",
        topic,
        Buffer.from(json),
        { persistent: true },
        (error) => (error ? reject(error) : resolve())
      )
    );
  }

  async processMessage(message: any, channel: any) {
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

  getSubscribers(topic: any) {
    return this.subscribersByTopic.get(topic) || [];
  }
}
