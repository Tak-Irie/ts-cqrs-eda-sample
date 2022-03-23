export class StreamVersionMismatchError extends Error {
  constructor(expectedVersion: any, currentVersion: any) {
    super("StreamVersionMismatch");
    Object.assign(this, { expectedVersion, currentVersion });
  }
}
