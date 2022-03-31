import { _EventStoreDB } from "modules/shared/infrastructure/implementation/_EventStoreDB";
import { EventBus } from "../../shared/infrastructure/EventBus";
import { RabbitMQBus } from "../../shared/infrastructure/implementation/RabbitMQBus";
import { RedisReadModelStorage } from "../../shared/infrastructure/implementation/RedisReadModelStorage";
import {
  EVENT_STORE_URI,
  MESSAGE_BROKER_URI,
} from "../../shared/util/Constants";
import { TaskBoardEvents } from "../domain/TaskBoardEvents";
import { TaskBoardCommandHandler } from "./usecase/TaskBoardCommandHandler";

const eventStore = new _EventStoreDB<TaskBoardEvents>(EVENT_STORE_URI);
const eventBus = new EventBus(new RabbitMQBus(MESSAGE_BROKER_URI, "taskBoard"));

const taskAssigneeReadModelStorage = new RedisReadModelStorage({
  uri: "task-board.redis",
  dataType: "taskAssignee",
  indexes: ["assigneeId"],
});

const taskBoardCommandHandler = new TaskBoardCommandHandler(eventStore);
new TaskBoardDomainEventHandlers({
  eventStore,
  eventBus,
  taskAssigneeReadModelStorage,
}).activate();

export { taskBoardCommandHandler };

// const httpInterface = createHttpInterface(
//   (message) => commandHandlers.handleCommand(message),
//   ["POST"]
// );
// http.createServer(httpInterface).listen(80);
