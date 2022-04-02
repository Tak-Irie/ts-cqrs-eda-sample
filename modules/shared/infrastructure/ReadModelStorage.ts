type UpdateArgs = {
  id: string;
  updates: {
    [key: string]: unknown;
  };
};

type LoadArgs = {
  id: string;
};

type FindArgs = {
  index: string;
  [key: string]: unknown;
};

type SubscribeArgs = {
  topic: string;
  callback: (arg: any) => void;
};

type PublishArgs = {
  topic: string;
  message: unknown;
};
export abstract class ReadModelStorage {
  constructor() {}
  async update({ id, updates }: UpdateArgs): Promise<unknown> {
    return;
  }
  async load({ id }: LoadArgs): Promise<unknown> {
    return;
  }
  async findByIndex({ index }: FindArgs): Promise<unknown> {
    return;
  }
  async subscribeToChanges({
    topic,
    callback,
  }: SubscribeArgs): Promise<unknown> {
    return;
  }
  async publishChangeMessage({
    topic,
    message,
  }: PublishArgs): Promise<unknown> {
    return;
  }
}
