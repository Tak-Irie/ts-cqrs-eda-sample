import { verify } from "../../../shared/util/verify";
import {
  createTaskAddedToTaskBoard,
  createTaskBoardCreated,
  createTaskRemovedFromTaskBoard,
  TaskBoardEvents,
} from "../../domain/TaskBoardEvents";

type State = { id?: string; taskIds?: string[] };

const applyTaskBoardEvents = (state: State, events: TaskBoardEvents[]) =>
  events.reduce(applyEvent, { taskIds: [], ...state });

const applyEvent = (state: State, event: TaskBoardEvents) => {
  if (event.type === "TaskAddedToTaskBoard")
    return {
      ...state,
      taskIds: (state.taskIds || []).concat(event.data.taskId),
    };
  if (event.type === "TaskRemovedFromTaskBoard")
    return {
      ...state,
      taskIds: (state.taskIds || []).filter((id) => id !== event.data.taskId),
    };
  return { ...state };
};

const createTaskBoard = (id: string) => {
  return createTaskBoardCreated({ taskBoardId: id });
};

const addTask = (state: State, taskId: string) => [
  createTaskAddedToTaskBoard({ taskBoardId: state.id!, taskId }),
];

const removeTask = (state: State, taskId: string) => {
  verify("task is on board", !!state.taskIds?.includes(taskId));
  return [createTaskRemovedFromTaskBoard({ taskBoardId: state.id!, taskId })];
};

export { applyTaskBoardEvents, createTaskBoard, addTask, removeTask };
