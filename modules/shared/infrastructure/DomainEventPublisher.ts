import { mkdirSync } from "fs";
import { writeFile } from "fs/promises";
import { EventBus } from "./EventBus";
import { EventStoreDB } from "./implementation/EventStoreDB";

import { deserializeJSON, serializeJSON } from "../util/json";

type Options<T extends { type: string }> = {
  storageDirectory: string;
  eventStore: EventStoreDB;
  eventBus: EventBus<T>;
  publicEventTypes: string[];
};

class DomainEventPublisher<T extends { type: string }> {
  private eventStore: EventStoreDB;
  private eventBus: EventBus<T>;
  private publicEventTypes: string[];
  private positionFilePath: string;

  constructor({
    storageDirectory,
    eventStore,
    eventBus,
    publicEventTypes,
  }: Options<T>) {
    this.eventStore = eventStore;
    this.eventBus = eventBus;
    this.publicEventTypes = publicEventTypes;
    this.positionFilePath = `${storageDirectory}/_processed-stream-position`;
    mkdirSync(storageDirectory, { recursive: true });
  }

  async activate() {
    const processedPosition = deserializeJSON(
      await readFileWithFallback(this.#positionFilePath, null)
    );
    console.log(processedPosition);
    this.#eventStore.subscribeToAll(
      async (event) => {
        const shouldPublishEvent = this.#publicEventTypes.includes(event.type);
        if (shouldPublishEvent)
          await this.#eventBus.publish({
            ...event,
            revision: event.revision.toString(),
            position: undefined,
          });
        await writeFile(this.#positionFilePath, serializeJSON(event.position));
      },
      processedPosition ? { startPosition: processedPosition } : undefined
    );
  }
}

class _DomainEventPublisher<Event extends { type: string }> {
  #eventStore: ConcurrencySafeFilesystemEventStore<Event>;
  #eventBus: EventBus<Event>;
  #publicEventTypes: string[];
  #versionFilePath: string;

  constructor({
    storageDirectory,
    eventStore,
    eventBus,
    publicEventTypes,
  }: Options<Event>) {
    this.#eventStore = eventStore;
    this.#eventBus = eventBus;
    this.#publicEventTypes = publicEventTypes;
    this.#versionFilePath = `${storageDirectory}/_processed-stream-version`;
    mkdirSync(storageDirectory, { recursive: true });
  }

  async activate() {
    const processedVersion = Number(
      await readFileWithFallback(this.#versionFilePath, "0")
    );
    this.#eventStore.subscribe(
      "$global",
      async (event) => {
        const shouldPublishEvent = this.#publicEventTypes.includes(event.type);
        if (shouldPublishEvent) await this.#eventBus.publish(event);
        await writeFile(this.#versionFilePath, `${event.number}`);
      },
      { startVersion: processedVersion + 1 }
    );
  }
}

export default DomainEventPublisher;
