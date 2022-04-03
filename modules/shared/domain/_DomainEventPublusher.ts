// import { mkdirSync } from "fs";
// import { writeFile } from "fs/promises";
// import EventBus from "../event-bus/event-bus";

// import readFileWithFallback from "../filesystem/read-file-with-fallback";
// import ConcurrencySafeFilesystemEventStore from "./concurrency-safe-filesystem-event-store";

// type Options<Event extends { type: string }> = {
//   storageDirectory: string;
//   eventStore: ConcurrencySafeFilesystemEventStore<Event>;
//   eventBus: EventBus<Event>;
//   publicEventTypes: string[];
// };

// class DomainEventPublisher<Event extends { type: string }> {
//   #eventStore: ConcurrencySafeFilesystemEventStore<Event>;
//   #eventBus: EventBus<Event>;
//   #publicEventTypes: string[];
//   #versionFilePath: string;

//   constructor({
//     storageDirectory,
//     eventStore,
//     eventBus,
//     publicEventTypes,
//   }: Options<Event>) {
//     this.#eventStore = eventStore;
//     this.#eventBus = eventBus;
//     this.#publicEventTypes = publicEventTypes;
//     this.#versionFilePath = `${storageDirectory}/_processed-stream-version`;
//     mkdirSync(storageDirectory, { recursive: true });
//   }

//   async activate() {
//     const processedVersion = Number(
//       await readFileWithFallback(this.#versionFilePath, "0")
//     );
//     this.#eventStore.subscribe(
//       "$global",
//       async (event) => {
//         const shouldPublishEvent = this.#publicEventTypes.includes(event.type);
//         if (shouldPublishEvent) await this.#eventBus.publish(event);
//         await writeFile(this.#versionFilePath, `${event.number}`);
//       },
//       { startVersion: processedVersion + 1 }
//     );
//   }
// }

// export default DomainEventPublisher;
