import { generateId } from "../util/generateId";
import { JSONType } from "../util/SharedTypes";

type MetadataType = JSONType | Uint8Array;

type MessageType<TYPE_NAME> = {
  type: TYPE_NAME;
  metadata?: MetadataType;
};

type MessageData<TYPE_NAME, DATA> = {
  id: string;
  type: TYPE_NAME;
  data: DATA;
  metadata: MetadataType;
};

const useMessageFactory = <TYPE_NAME extends string, DATA extends JSONType>({
  type,
  metadata = { createdAt: Date.now() },
}: MessageType<TYPE_NAME>) => {
  return (data: DATA): MessageData<TYPE_NAME, DATA> => ({
    id: generateId(),
    type,
    data,
    metadata,
  });
};

export { useMessageFactory, MessageData };
