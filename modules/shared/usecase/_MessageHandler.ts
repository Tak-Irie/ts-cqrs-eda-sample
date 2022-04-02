import { MessageData } from "./_Message";

type _MessageHandler<MESSAGE extends MessageData> = {
  [MESSAGE_TYPE_NAME in MESSAGE["type"] as `handle${MESSAGE_TYPE_NAME}`]: (
    message: Extract<MESSAGE, { type: MESSAGE_TYPE_NAME }>
  ) => unknown;
};

export { _MessageHandler };
