const useMessageForwarder =
  <TARGET extends { [key: string]: any }>(target: TARGET) =>
  <MESSAGE extends { type: string }>(
    message: MESSAGE
  ): ReturnType<TARGET[`handle${MESSAGE["type"]}`]> =>
    target[`handle${message.type}`](message);

export { useMessageForwarder };
