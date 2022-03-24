import { EVENT_STORE_URI } from "../util/Constants";
import { generateId } from "../util/generateId";

export const createEventType =
  <TypeName extends string>(type: TypeName) =>
  <Data>() => {
    return class Event {
      static readonly type: TypeName = type;
      readonly type = type;
      readonly id = generateId();
      readonly metadata = {};

      constructor(readonly data: Data) {}
    };
  };
