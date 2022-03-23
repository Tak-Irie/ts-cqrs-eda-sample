type Subscriber = (message: any) => void;

class MessageBus {
  private subscribersByTopic = new Map<string, Array<Subscriber>>();

  subscribe(topic: string, subscriber: Subscriber) {
    const newSubscribers = this.getSubscribers(topic).concat([subscriber]);
    this.subscribersByTopic.set(topic, newSubscribers);
  }

  unsubscribe(topic: string, subscriber: Subscriber) {
    const subscribers = this.getSubscribers(topic).slice();
    subscribers.splice(subscribers.indexOf(subscriber), 1);
    this.subscribersByTopic.set(topic, subscribers);
  }

  async publish(topic: string, message: any) {
    await Promise.all(
      this.getSubscribers(topic).map(
        (subscriber) =>
          new Promise((resolve) =>
            setTimeout(() => {
              Promise.resolve(subscriber(message)).then(resolve);
            })
          )
      )
    );
  }

  getSubscribers(topic: string) {
    return this.subscribersByTopic.get(topic) || [];
  }
}

export default MessageBus;
