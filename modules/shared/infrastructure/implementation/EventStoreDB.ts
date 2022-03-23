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
} from "@eventstore/db-client";

import { EventStore } from "../EventStore";
import { StreamVersionMismatchError } from "../StreamVersionMismatchError";
import { AsyncQueue } from "../../domain/AsyncQueue";
import { Event, EventType } from "../../domain";
import { JSONType } from "../../util/SharedTypes";

type SaveArgs<T extends JSONEventType> = {
  streamID: string;
  event: EventData<T>;
  expectedRevision: AppendExpectedRevision;
};

type LoadArgs = {
  streamID: string;
  startVersion: number;
};

type SubscribeArgs = {
  streamID: string;
  callback: (event: RecordedEvent) => void;
  startVersion: ReadRevision;
};

type SubscribeToAllArgs = {
  callback: (event: AllStreamRecordedEvent) => void;
  typeNameFilters: string[];
  fromPosition: ReadPosition;
};

export class EventStoreDB extends EventStore {
  private client: EventStoreDBClient;
  constructor(uri: string) {
    super();
    this.client = EventStoreDBClient.connectionString(uri);
  }

  async save<T extends JSONEventType>(
    args: SaveArgs<T>
  ): Promise<AppendResult> {
    try {
      // console.log("db-args:", args);
      const { event, streamID } = args;

      let expectedRevision = args.expectedRevision;
      if (expectedRevision === null) expectedRevision = NO_STREAM;

      const response = await this.client.appendToStream(streamID, event, {
        expectedRevision,
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

  // async load(args: LoadArgs) {
  //   try {
  //     const { startVersion, streamID } = args;

  //     const fromRevision = BigInt(startVersion);
  //     const events = this.client.readStream<SomeEvent>(streamID, {
  //       fromRevision,
  //     });

  //     return {
  //       events,
  //       currentVersion:
  //         events.length > 0 ? events[events.length - 1].revision : null,
  //     };
  //   } catch (error) {
  //     if (!(error instanceof StreamNotFoundError)) throw error;
  //     return { events: [], currentVersion: null };
  //   }
  // }

  async subscribe(args: SubscribeArgs) {
    const { callback, startVersion, streamID } = args;
    const callbackExecutionQueue = new AsyncQueue();
    const subscription = this.client.subscribeToStream(streamID, {
      fromRevision: startVersion,
    });
    subscription.on("data", ({ event }) => {
      if (!event) return;
      callbackExecutionQueue.enqueueOperation(() => callback(event));
    });
  }

  async subscribeToAll(args: SubscribeToAllArgs) {
    const { callback, fromPosition, typeNameFilters } = args;
    const callbackExecutionQueue = new AsyncQueue();
    const subscription = this.client.subscribeToAll({
      fromPosition,
      filter: eventTypeFilter({ prefixes: typeNameFilters }),
    });
    subscription.on("data", ({ event }) => {
      if (!event) return;
      callbackExecutionQueue.enqueueOperation(() => callback(event));
    });
  }
}
