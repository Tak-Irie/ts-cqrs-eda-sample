import { generateID } from "../util/generateID";
import { JSONType } from "../util/SharedTypes";

type MetadataType = JSONType | Uint8Array;

type MessageType = {
  typeName: string;
  data: JSONType;
  metadata: MetadataType;
};

class Message {
  readonly typeName: string;
  readonly data: JSONType;
  readonly id = generateID();
  readonly metadata: MetadataType;

  constructor(typeName: string, data: JSONType, metadata: MetadataType) {
    this.typeName = typeName;
    this.data = data;
    this.metadata = metadata;
  }

  static createMessage<T extends MessageType>(message: T): Message {
    return new Message(message.typeName, message.data, message.metadata);
  }
}

export { MessageType, Message };
