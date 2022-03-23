export class AsyncQueue {
  private currentQueuePromise: Promise<void> = Promise.resolve();

  enqueueOperation(operation: any): Promise<void> {
    this.currentQueuePromise = this.currentQueuePromise.then(
      operation,
      operation
    );
    return this.currentQueuePromise;
  }
}
