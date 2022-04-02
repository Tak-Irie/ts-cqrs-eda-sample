import { EventData } from "../domain/_Event";
import { EventStore } from "../infrastructure/EventStore";
import { _EventStoreDB } from "../infrastructure/implementation/_EventStoreDB";
import { ReadModelStorage } from "../infrastructure/ReadModelStorage";

type ReadModelProjectionConstructor<
  EVENT_STORE extends EventStore<Event>,
  READ_MODEL_STORAGE extends ReadModelStorage
> = {
  eventStore: EVENT_STORE;
  readModelStorage: READ_MODEL_STORAGE;
};

export { ReadModelProjectionConstructor };
