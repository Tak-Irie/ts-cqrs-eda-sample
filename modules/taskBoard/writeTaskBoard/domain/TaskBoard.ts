import { verify } from "../../../shared/util/verify";
import {
  TaskBoardEvents,
  TaskBoardCreatedEventClass,
  TaskAddedToTaskBoardEvent,
  TaskRemovedFromTaskBoardEvent,
} from "../../domain/TaskBoardEvents";

type State = { id?: string; taskIds?: string[] };

const applyTaskBoardEvents = (state: State, events: TaskBoardEvents[]) =>
  events.reduce(applyEvent, { taskIds: [], ...state });

const applyEvent = (state: State, event: TaskBoardEvents) => {
  if (event.type === TaskAddedToTaskBoardEvent.type)
    return {
      ...state,
      taskIds: (state.taskIds || []).concat(event.data.taskId),
    };
  if (event.type === TaskRemovedFromTaskBoardEvent.type)
    return {
      ...state,
      taskIds: (state.taskIds || []).filter((id) => id !== event.data.taskId),
    };
  return { ...state };
};

const createTaskBoard = (id: string) => {
  return new TaskBoardCreatedEventClass({ taskBoardId: id });
};

const addTask = (state: State, taskId: string) => [
  new TaskAddedToTaskBoardEvent({ taskBoardId: state.id!, taskId }),
];

const removeTask = (state: State, taskId: string) => {
  verify("task is on board", !!state.taskIds?.includes(taskId));
  return [
    new TaskRemovedFromTaskBoardEvent({ taskBoardId: state.id!, taskId }),
  ];
};

export { applyTaskBoardEvents, createTaskBoard, addTask, removeTask };
