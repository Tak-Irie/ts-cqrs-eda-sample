import { _EventStoreDB } from "modules/shared/infrastructure/implementation/_EventStoreDB";
import { RabbitMQBus } from "../../shared/infrastructure/implementation/RabbitMQBus";
import { RedisReadModelStorage } from "../../shared/infrastructure/implementation/RedisReadModelStorage";
import {
  EVENT_STORE_URI,
  MESSAGE_BROKER_URI,
} from "../../shared/util/Constants";
import { TaskBoardEvents } from "../domain/TaskBoardEvents";
import { TaskBoardCommandHandler } from "./usecase/TaskBoardCommandHandler";
import {
  TaskBoardEventHandler,
  HandledEvent,
} from "./usecase/TaskBoardEventHandler.ts";

const useWriteTaskBoard = () => {
  const eventStore = new _EventStoreDB<TaskBoardEvents>({
    uri: EVENT_STORE_URI,
  });
  const taskBoardCommandHandler = new TaskBoardCommandHandler(eventStore);

  const taskAssigneeReadModelStorage = new RedisReadModelStorage({
    uri: "task-board.redis",
    dataType: "taskAssignee",
    indexes: ["assigneeId"],
  });

  const eventBus = new RabbitMQBus<HandledEvent>({
    uri: MESSAGE_BROKER_URI,
    subscriberGroup: "taskBoard",
  });
  new TaskBoardEventHandler({
    eventStore,
    eventBus,
    taskAssigneeReadModelStorage,
  }).activate();

  return taskBoardCommandHandler;
};

export { useWriteTaskBoard };
