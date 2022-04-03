import { generateUUIDv4 } from "../util/generateId";
import { JSONType } from "../util/SharedTypes";

type MetadataType = JSONType | Uint8Array;

type EventType<
  TYPENAME extends string = string,
  DATA extends JSONType = JSONType
> = {
  type: TYPENAME;
  data: DATA;
  metadata: MetadataType;
};

class Event<TYPENAME extends string, DATA extends JSONType> {
  readonly type: TYPENAME;
  readonly data: DATA;
  readonly id = generateUUIDv4();
  readonly metadata: MetadataType;

  private constructor(type: TYPENAME, data: DATA, metadata: MetadataType) {
    this.type = type;
    this.data = data;
    this.metadata = metadata;
  }

  static createEvent<DATA extends JSONType, TYPENAME extends string>(
    type: TYPENAME,
    metadata?: MetadataType
  ) {
    const _metadata = { metadata, created: Date.now() };
    return (data: DATA) => {
      return new Event<TYPENAME, DATA>(type, data, _metadata);
    };
  }
}

const createEvent =
  <TypeName extends string>(type: TypeName) =>
  <Data>() => {
    return class Event {
      static readonly type: TypeName = type;
      readonly type = type;
      readonly id = generateUUIDv4();
      readonly metadata = {};

      constructor(readonly data: Data) {}
    };
  };

export { Event, createEvent };
export type { EventType };
