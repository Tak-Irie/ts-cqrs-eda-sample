type MessageHandler<Message extends { type: string }, Suffix extends string> = {
  [MessageType in Message["type"] as `handle${MessageType}${Suffix}`]: (
    message: Extract<Message, { type: MessageType }>
  ) => any;
};

export { MessageHandler };
