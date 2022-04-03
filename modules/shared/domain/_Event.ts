import { generateUUIDv4 } from "../util/generateId";

type MetadataType = {
  [key: string]: string | number;
};

type DataType = {
  [key: string]: string | number;
};

type EventType<TYPE_NAME> = {
  type: TYPE_NAME;
  metadata?: MetadataType;
};

type EventData<TYPE_NAME = string, DATA = DataType> = {
  id: string;
  type: TYPE_NAME;
  data: DATA;
  metadata: MetadataType;
};

const useEventFactory = <TYPE_NAME extends string, DATA extends DataType>({
  type,
  metadata = { createdAt: Date.now() },
}: EventType<TYPE_NAME>) => {
  return (data: DATA): EventData<TYPE_NAME, DATA> => ({
    id: generateUUIDv4(),
    type,
    data,
    metadata,
  });
};

export type { EventData };
export { useEventFactory };
