import { EventType } from "../domain/Event";

type Args = {
  [key: string]: unknown;
};

export abstract class EventStore<EVENT> {
  async save(arg: Args): Promise<unknown> {
    const result = await "some";
    return result;
  }
  load(streamId: string): unknown {
    return;
  }
  subscribe(args: Args): unknown {
    return;
  }
  subscribeToAll(args: Args): unknown {
    return;
  }
}
