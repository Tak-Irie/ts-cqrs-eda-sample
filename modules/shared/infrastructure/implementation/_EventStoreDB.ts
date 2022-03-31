import {
  EventStoreDBClient,
  eventTypeFilter,
  JSONEventData,
  StreamNotFoundError,
  EventTypeToRecordedEvent,
  AllStreamResolvedEvent,
  ResolvedEvent,
} from "@eventstore/db-client";
import { EventData } from "modules/shared/domain/_Event";
import { EventStore } from "../EventStore";

type EventHandler<EVENT> = (event: EVENT) => void;

type SubscribeArg<EVENT> = {
  streamId: string;
  eventHandler: EventHandler<EVENT>;
};
type subscribeToAllArg<EVENT extends EventData> = {
  typeNameFilters: EVENT["type"][];
  eventHandler: EventHandler<EVENT>;
};
type SaveArg<EVENT> = {
  streamId: string;
  event: EVENT | EVENT[];
  expectedRevision: "any" | "no_stream" | "stream_exists" | bigint;
};
type LoadResult<EVENT> = {
  events: EVENT[];
  currentVersion: bigint;
};

export class _EventStoreDB<EVENT extends EventData>
  implements EventStore<EVENT>
{
  private client: EventStoreDBClient;
  constructor(uri: string) {
    this.client = EventStoreDBClient.connectionString(uri);
  }

  async save({
    streamId,
    event,
    expectedRevision,
  }: SaveArg<EVENT>): Promise<boolean> {
    const events: JSONEventData[] = [];
    if (Array.isArray(event)) {
      event.forEach((e) => events.push(this.convertEventFromDomainToStore(e)));
    } else {
      events.push(this.convertEventFromDomainToStore(event));
    }

    const res = await this.client.appendToStream(streamId, events, {
      expectedRevision,
    });
    if (!res.success) return false;
    return true;
  }

  async load(streamId: string): Promise<LoadResult<EVENT> | false> {
    const res = await this.client.readStream<EVENT>(streamId, {
      direction: "forwards",
      fromRevision: "start",
    });

    try {
      const events: EventTypeToRecordedEvent<EVENT>[] = [];
      const eventData: EVENT[] = [];
      for await (const resolvedEvent of res) {
        if (resolvedEvent.event === undefined) return false;
        const { data, id, type, metadata } = resolvedEvent.event;
        events.push(resolvedEvent.event);
        eventData.push({ id, data, metadata, type } as EVENT);
      }

      return {
        events: eventData,
        currentVersion: events[events.length - 1].revision,
      };
    } catch (error) {
      if (error instanceof StreamNotFoundError) {
        return false;
      }

      throw error;
    }
  }

  async subscribe({ streamId, eventHandler }: SubscribeArg<EVENT>) {
    const subscriber = this.client.subscribeToStream<EVENT>(streamId);
    subscriber.on("data", (event) => {
      const isEvent = this.convertEventFromStoreToDomain(event);
      if (isEvent === false) return false;

      eventHandler(isEvent);
    });
  }

  async subscribeToAll({
    typeNameFilters,
    eventHandler,
  }: subscribeToAllArg<EVENT>) {
    const subscriber = this.client.subscribeToAll({
      filter: eventTypeFilter({ prefixes: typeNameFilters }),
    });

    subscriber.on("data", (event) => {
      const isEvent = this.convertEventFromStoreToDomain(event);
      if (isEvent === false) return false;

      eventHandler(isEvent);
    });
  }

  private convertEventFromDomainToStore(event: EventData): JSONEventData {
    const { data, id, metadata, type } = event;
    return {
      id,
      contentType: "application/json",
      data,
      metadata,
      type,
    };
  }

  private convertEventFromStoreToDomain(
    event: ResolvedEvent<EVENT> | AllStreamResolvedEvent
  ): EVENT | false {
    if (event.event && event.event.isJson) {
      const { id, type, data, metadata } = event.event;
      return {
        id,
        type,
        data,
        metadata,
      } as EVENT;
    }

    return false;
  }
}
