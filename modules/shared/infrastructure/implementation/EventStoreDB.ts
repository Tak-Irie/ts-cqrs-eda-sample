import {
  EventStoreDBClient,
  jsonEvent,
  JSONEventType,
  JSONEventData,
  JSONEventOptions,
  StreamNotFoundError,
  excludeSystemEvents,
  START,
  NO_STREAM,
  ANY,
  ReadRevision,
  ReadPosition,
  AppendExpectedRevision,
  AppendResult,
  EventData,
  AllStreamRecordedEvent,
  Filter,
  eventTypeFilter,
  ResolvedEvent,
  RecordedEvent,
  ReadStreamOptions,
  EventTypeToRecordedEvent,
  SubscribeToStreamOptions,
} from "@eventstore/db-client";

import { EventStore } from "../EventStore";
import { StreamVersionMismatchError } from "../StreamVersionMismatchError";
import { AsyncQueue } from "../../domain/AsyncQueue";
import { Event, EventType } from "../../domain";
import { JSONType } from "../../util/SharedTypes";
import { ReadSyncOptions } from "fs";
import { ReadableOptions } from "stream";

type SubscribeArgs = {
  streamID: string;
  callback: (event: RecordedEvent) => void;
  startVersion: ReadRevision;
};

type Callback<EVENT> = (event: EVENT) => void;
// type Numbered<T> = T & { number: number };

export class EventStoreDB<EVENT extends EventType> {
  private client: EventStoreDBClient;
  constructor(uri: string) {
    this.client = EventStoreDBClient.connectionString(uri);
  }

  async save(
    streamID: string,
    event: EventData<EVENT>,
    expectedRevision: "stream_exists" | "no_stream" | "any" | bigint
  ): Promise<AppendResult> {
    try {
      // console.log("db-args:", args);

      let _expectedRevision = expectedRevision;
      if (expectedRevision === null) _expectedRevision = NO_STREAM;

      const response = await this.client.appendToStream(streamID, event, {
        expectedRevision: _expectedRevision,
      });
      console.log("res:", response);
      if (!response.success)
        throw new StreamVersionMismatchError(
          expectedRevision,
          response.nextExpectedRevision - BigInt(1)
        );

      return response;
    } catch (err) {
      console.log("err:", err);
      return { success: false, nextExpectedRevision: BigInt(1) };
    }
  }

  async load(
    streamId: string,
    options?: ReadStreamOptions,
    readableOptions?: ReadableOptions
  ) {
    try {
      const events = this.client.readStream<EVENT>(
        streamId,
        options,
        readableOptions
      );
      let eventData: EventTypeToRecordedEvent<EVENT>[] = [];
      for await (const resolvedEvent of events) {
        if (resolvedEvent.event) {
          eventData.push(resolvedEvent.event);
        }
      }

      return {
        eventData,
        currentVersion:
          eventData !== undefined && eventData.length > 0
            ? eventData[eventData.length - 1].revision
            : null,
      };
    } catch (error) {
      if (!(error instanceof StreamNotFoundError)) throw error;
      return { events: [], currentVersion: null };
    }
  }

  async subscribe(
    callback: Callback<EVENT>,
    streamId: string,
    options: SubscribeToStreamOptions
  ) {
    const callbackExecutionQueue = new AsyncQueue();
    const subscription = this.client.subscribeToStream<EVENT>(
      streamId,
      options
    );
    subscription.on("data", ({ event }) => {
      if (!event) return;
      const { data, type, metadata } = event;
      const _event = {
        type,
        data,
        metadata,
      } as EVENT;
      callbackExecutionQueue.enqueueOperation(() => callback(_event));
    });
  }

  async subscribeToAll(
    callback: Callback<EVENT>,
    typeNameFilters: string[],
    fromPosition: ReadPosition
  ) {
    const callbackExecutionQueue = new AsyncQueue();
    const subscription = this.client.subscribeToAll({
      fromPosition,
      filter: eventTypeFilter({ prefixes: typeNameFilters }),
    });
    subscription.on("data", ({ event }) => {
      if (event === undefined || event.metadata === undefined || !event.isJson)
        return;
      const { data, type, metadata } = event;
      const _event = {
        type,
        data,
        metadata,
      } as EVENT;
      callbackExecutionQueue.enqueueOperation(() => callback(_event));
    });
  }
}
