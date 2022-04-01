import { EventData } from "../domain/_Event";

type Subscriber<EVENT extends EventData> = (event: EVENT) => void;

type SubscribeArg<EVENT extends EventData> = {
  eventType: EVENT["type"];
  subscriber: Subscriber<EVENT>;
};

type UnsubscribeArg<EVENT extends EventData> = {
  eventType: EVENT["type"];
  subscriber: Subscriber<EVENT>;
};

type PublishArg<EVENT extends EventData> = {
  eventType: EVENT["type"];
  event: EVENT;
};

abstract class EventBus<EVENT extends EventData> {
  async subscribe({
    eventType,
    subscriber,
  }: SubscribeArg<EVENT>): Promise<void> {}
  async unsubscribe({
    eventType,
    subscriber,
  }: UnsubscribeArg<EVENT>): Promise<void> {}
  async publish({ eventType, event }: PublishArg<EVENT>): Promise<unknown> {
    return;
  }
}

export { EventBus, SubscribeArg, UnsubscribeArg, PublishArg, Subscriber };
