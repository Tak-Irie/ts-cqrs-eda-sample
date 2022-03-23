const USER_NAME_MAX_LENGTH = 20;
const USER_NAME_MIN_LENGTH = 3;

const EVENT_STORE_URI =
  "esdb://127.0.0.1:2113?tls=false&keepAliveTimeout=10000&keepAliveInterval=10000";

const MESSAGE_BROKER_URI = "amqp://rabbitmq";

export {
  USER_NAME_MAX_LENGTH,
  USER_NAME_MIN_LENGTH,
  EVENT_STORE_URI,
  MESSAGE_BROKER_URI,
};
