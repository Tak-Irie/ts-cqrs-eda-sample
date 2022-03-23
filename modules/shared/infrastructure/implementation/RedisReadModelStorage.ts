import Redis, { ValueType } from "ioredis";
import { ReadModelStorage } from "../ReadModelStorage";

export class RedisReadModelStorage implements ReadModelStorage {
  private client;
  private subscribeClient;
  private dataType;
  private indexes;

  constructor(host: string, dataType: string, indexes: string[]) {
    this.client = new Redis(host);
    this.subscribeClient = new Redis(host);
    this.dataType = dataType;
    this.indexes = indexes;
  }

  async update(id: string, updates: any) {
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
      pipeline.rpush(this.getRedisIndexKey(index, updates[index]), id);
    }
    await pipeline.exec();
  }

  load(id: string) {
    return this.client.hgetall(`${this.dataType}:${id}`);
  }

  async findByIndex(index: string, indexValue: string) {
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

  async subscribeToChanges(topic: string, callback: any) {
    const channelToSubscribe = `${this.dataType}:${topic}`;
    await this.subscribeClient.subscribe(channelToSubscribe);
    this.subscribeClient.on("message", (channel, message) => {
      if (channel === channelToSubscribe) callback(JSON.parse(message));
    });
  }

  async publishChangeMessage(topic: string, message: any) {
    await this.client.publish(
      `${this.dataType}:${topic}`,
      JSON.stringify(message)
    );
  }
}
