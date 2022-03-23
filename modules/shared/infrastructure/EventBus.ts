import MessageBus from "./MessageBus";

type Subscriber<T, U> = (event: Extract<T, { type: U }>) => any;

export class EventBus<T extends { type: string }> {
  private messageBus;

  constructor(messageBus: Omit<MessageBus, ""> = new MessageBus()) {
    this.messageBus = messageBus;
  }

  subscribe<U extends string>(eventType: U, subscriber: Subscriber<T, U>) {
    this.messageBus.subscribe(eventType, subscriber);
  }

  unsubscribe<U extends string>(eventType: U, subscriber: Subscriber<T, U>) {
    this.messageBus.unsubscribe(eventType, subscriber);
  }

  publish(event: T) {
    return this.messageBus.publish(event.type, event);
  }
}
