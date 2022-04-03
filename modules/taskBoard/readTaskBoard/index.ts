import { RedisReadModelStorage } from "../../shared/infrastructure/implementation/RedisReadModelStorage";
import { _EventStoreDB } from "../../shared/infrastructure/implementation/_EventStoreDB";
import { EVENT_STORE_URI, REDIS_URI } from "../../shared/util/Constants";
import { TaskBoardEvents } from "../domain/TaskBoardEvents";
import TaskBoardReadModelProjection from "./usecase/TaskBoardProjection";
import { TaskBoardQueryHandler } from "./usecase/TaskBoardQueryHandler";

const useReadTaskBoard = () => {
  const eventStore = new _EventStoreDB<TaskBoardEvents>({
    uri: EVENT_STORE_URI,
  });

  const taskReadModelStorage = new RedisReadModelStorage({
    uri: REDIS_URI,
    dataType: "task",
    indexes: ["taskBoardId"],
  });

  const taskBoardQueryHandler = new TaskBoardQueryHandler({
    readModelStorage: taskReadModelStorage,
  });

  const taskBoardReadModelProjection = new TaskBoardReadModelProjection({
    eventStore,
    readModelStorage: taskReadModelStorage,
  });

  taskBoardReadModelProjection.activate();

  return taskBoardQueryHandler;
};

export { useReadTaskBoard };
