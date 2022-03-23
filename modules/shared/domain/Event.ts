import { generateID } from "../util/generateID";
import { JSONType } from "../util/SharedTypes";

type MetadataType = JSONType | Uint8Array;

type EventType<T extends string, U extends JSONType> = {
  type: T;
  data: U;
  metadata: MetadataType;
};

class Event<T extends string, U extends JSONType> {
  readonly type: T;
  readonly data: U;
  readonly id = generateID();
  readonly metadata: MetadataType;

  constructor(type: T, data: U, metadata: MetadataType) {
    this.type = type;
    this.data = data;
    this.metadata = metadata;
  }

  static createEvent<T extends string, U extends JSONType>(
    event: EventType<T, U>
  ): Event<T, U> {
    const { data, metadata, type } = event;
    return new Event<T, U>(type, data, metadata);
  }
}

export { Event };
export type { EventType };
