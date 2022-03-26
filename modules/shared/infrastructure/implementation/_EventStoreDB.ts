import {
  EventStoreDBClient,
  JSONEventType,
  jsonEvent,
  eventTypeFilter,
} from "@eventstore/db-client";

type UserRegistered = JSONEventType<
  "UserRegistered",
  {
    userId: string;
    userName: string;
    userEmail: string;
  }
>;

type EventHandler = (event: any) => void;

export class _EventStoreDB {
  private client: EventStoreDBClient;
  constructor(uri: string) {
    this.client = EventStoreDBClient.connectionString(uri);
  }

  async save() {
    const event = jsonEvent<UserRegistered>({
      type: "UserRegistered",
      data: {
        userId: "123",
        userEmail: "hoge@email.com",
        userName: "fuga",
      },
    });
    const res = await this.client.appendToStream(`user/${123}`, event, {
      expectedRevision: "no_stream",
    });
    if (!res.success) return false;
    return true;
  }

  async load() {
    const res = this.client.readStream<UserRegistered>(`user/${123}`, {
      direction: "forwards",
      fromRevision: "start",
    });

    for await (const event of res) {
      console.log("event:", event);
    }
  }

  async subscribe(streamId: string, eventHandler: EventHandler) {
    const subscriber = this.client.subscribeToStream<UserRegistered>(streamId);
    subscriber.on("data", (event) => {
      eventHandler(event);
    });
  }

  async subscribeToAll(typeNameFilters: string[], eventHandler: EventHandler) {
    const subscriber = this.client.subscribeToAll({
      filter: eventTypeFilter({ prefixes: typeNameFilters }),
    });
    subscriber.on("data", (event) => {
      eventHandler(event);
    });
  }
}
