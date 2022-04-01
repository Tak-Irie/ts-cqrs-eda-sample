import Redis from "ioredis";
import { ReadModelStorage } from "../ReadModelStorage";

type UpdateArg = {
  id: string;
  updates: {
    [key: string]: string | number;
  };
};

type FindArgs = {
  index: string;
  indexValue: string;
};

type SubscribeArgs = {
  topic: string;
  callback: (arg: any) => void;
};

type PublishArgs = {
  topic: string;
  message: any;
};

export class RedisReadModelStorage implements ReadModelStorage {
  private client;
  private subscribeClient;
  private dataType;
  private indexes;

  constructor({
    uri,
    dataType,
    indexes,
  }: {
    uri: string;
    dataType: string;
    indexes: string[];
  }) {
    this.client = new Redis(uri);
    this.subscribeClient = new Redis(uri);
    this.dataType = dataType;
    this.indexes = indexes;
  }

  async update({ id, updates }: UpdateArg) {
    const oldRecord = await this.client.hgetall(`${this.dataType}:${id}`);
    const pipeline = this.client.multi();

    pipeline.hmset(`${this.dataType}:${id}`, updates);
    const indexesToUpdate = this.indexes.filter((index) => index in updates);

    for (const index of indexesToUpdate) {
      if (index in oldRecord)
        pipeline.lrem(
          this.getRedisIndexKey(index, oldRecord[index]),
          0,
          oldRecord.id
        );

      pipeline.rpush(this.getRedisIndexKey(index, updates[index as any]), id);
    }
    await pipeline.exec();
  }

  async load({ id }: { id: string }) {
    return await this.client.hgetall(`${this.dataType}:${id}`);
  }

  async findByIndex({ index, indexValue }: FindArgs) {
    const ids = await this.client.lrange(
      this.getRedisIndexKey(index, indexValue),
      0,
      -1
    );
    return Promise.all(
      ids.map((id) => this.client.hgetall(`${this.dataType}:${id}`))
    );
  }

  getRedisIndexKey(index: string, value: string) {
    return `${this.dataType}:index:${index}:${value}`;
  }

  async subscribeToChanges({ topic, callback }: SubscribeArgs) {
    const channelToSubscribe = `${this.dataType}:${topic}`;
    await this.subscribeClient.subscribe(channelToSubscribe);
    this.subscribeClient.on("message", (channel, message) => {
      if (channel === channelToSubscribe) callback(JSON.parse(message));
    });
  }

  async publishChangeMessage({ topic, message }: PublishArgs) {
    await this.client.publish(
      `${this.dataType}:${topic}`,
      JSON.stringify(message)
    );
  }
}
