import { EventBus } from "../../shared/infrastructure/EventBus";
import { EventStoreDB } from "../../shared/infrastructure/implementation/EventStoreDB";
import { RabbitMQBus } from "../../shared/infrastructure/implementation/RabbitMQBus";
import { RedisReadModelStorage } from "../../shared/infrastructure/implementation/RedisReadModelStorage";
import {
  EVENT_STORE_URI,
  MESSAGE_BROKER_URI,
} from "../../shared/util/Constants";

const eventStore = new EventStoreDB(EVENT_STORE_URI);
const eventBus = new EventBus(new RabbitMQBus(MESSAGE_BROKER_URI, "taskBoard"));

const taskAssigneeReadModelStorage = new RedisReadModelStorage(
  "task-board.redis",
  "taskAssignee",
  ["assigneeId"]
);

// const commandHandlers = new TaskBoardCommandHandlers({ eventStore });
// new TaskBoardDomainEventHandlers({
//   eventStore,
//   eventBus,
//   taskAssigneeReadModelStorage,
// }).activate();

// const httpInterface = createHttpInterface(
//   (message) => commandHandlers.handleCommand(message),
//   ["POST"]
// );
// http.createServer(httpInterface).listen(80);
