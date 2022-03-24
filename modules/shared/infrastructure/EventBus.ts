import MessageBus from "./MessageBus";

type Subscriber<EVENT, TYPENAME> = (
  event: Extract<EVENT, { type: TYPENAME }>
) => any;

export class EventBus<EVENT extends { type: string }> {
  private messageBus;

  constructor(messageBus: Omit<MessageBus, ""> = new MessageBus()) {
    this.messageBus = messageBus;
  }

  subscribe<TYPENAME extends string>(
    eventType: TYPENAME,
    subscriber: Subscriber<EVENT, TYPENAME>
  ) {
    this.messageBus.subscribe(eventType, subscriber);
  }

  unsubscribe<TYPENAME extends string>(
    eventType: TYPENAME,
    subscriber: Subscriber<EVENT, TYPENAME>
  ) {
    this.messageBus.unsubscribe(eventType, subscriber);
  }

  publish(event: EVENT) {
    return this.messageBus.publish(event.type, event);
  }
}
