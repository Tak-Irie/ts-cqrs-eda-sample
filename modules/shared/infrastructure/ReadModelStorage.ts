type UpdateArgs = {
  [key: string]: unknown;
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
  callback: () => void;
};

type PublishArgs = {
  topic: string;
  message: unknown;
};
export abstract class ReadModelStorage {
  constructor() {}
  async update({}: UpdateArgs): Promise<unknown> {
    return;
  }
  async load({}: LoadArgs): Promise<unknown> {
    return;
  }
  async findByIndex({}: FindArgs): Promise<unknown> {
    return;
  }
  async subscribeToChanges({}: SubscribeArgs): Promise<unknown> {
    return;
  }
  async publishChangeMessage({}: PublishArgs): Promise<unknown> {
    return;
  }
}
