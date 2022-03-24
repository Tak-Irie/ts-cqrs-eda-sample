import { EventType } from "../domain/Event";

type Args = {
  [key: string]: string;
};

export abstract class EventStore {
  async save(some: Args): Promise<unknown> {
    const result = await "some";
    return result;
  }
  load(some: any): any {
    return some;
  }
  subscribe(some: any): any {
    return some;
  }
  subscribeToAll(some: any): any {
    return some;
  }
}
