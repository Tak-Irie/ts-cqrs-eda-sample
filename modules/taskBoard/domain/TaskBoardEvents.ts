import { useEventFactory } from "modules/shared/domain/_Event";

const createTaskCreated = useEventFactory<
  "TaskCreated",
  {
    taskId: string;
    title: string;
    description: string;
    status: string;
    assigneeId: string;
  }
>({ type: "TaskCreated" });

const createTaskAssigneeChanged = useEventFactory<
  "TaskAssigneeChanged",
  {
    taskId: string;
    assigneeId: string;
  }
>({ type: "TaskAssigneeChanged" });

const createTaskTitleChanged = useEventFactory<
  "TaskTitleChanged",
  {
    taskId: string;
    title: string;
  }
>({ type: "TaskTitleChanged" });

const createTaskDescriptionChanged = useEventFactory<
  "TaskDescriptionChanged",
  {
    taskId: string;
    description: string;
  }
>({ type: "TaskDescriptionChanged" });

const createTaskStatusChanged = useEventFactory<
  "TaskStatusChanged",
  {
    taskId: string;
    status: string;
  }
>({ type: "TaskStatusChanged" });

const createTaskBoardCreated = useEventFactory<
  "TaskBoardCreated",
  {
    taskBoardId: string;
  }
>({ type: "TaskBoardCreated" });
const createTaskAddedToTaskBoard = useEventFactory<
  "TaskAddedToTaskBoard",
  {
    taskBoardId: string;
    taskId: string;
  }
>({ type: "TaskAddedToTaskBoard" });
const createTaskRemovedFromTaskBoard = useEventFactory<
  "TaskRemovedFromTaskBoard",
  {
    taskBoardId: string;
    taskId: string;
  }
>({ type: "TaskRemovedFromTaskBoard" });

export type TaskCreated = ReturnType<typeof createTaskCreated>;
export type TaskAssigneeChanged = ReturnType<typeof createTaskAssigneeChanged>;
export type TaskTitleChanged = ReturnType<typeof createTaskTitleChanged>;
export type TaskDescriptionChanged = ReturnType<
  typeof createTaskDescriptionChanged
>;
export type TaskStatusChanged = ReturnType<typeof createTaskStatusChanged>;
export type TaskBoardCreated = ReturnType<typeof createTaskBoardCreated>;
export type TaskAddedToTaskBoard = ReturnType<
  typeof createTaskAddedToTaskBoard
>;
export type TaskRemovedFromTaskBoard = ReturnType<
  typeof createTaskRemovedFromTaskBoard
>;

type TaskBoardEvents =
  | TaskCreated
  | TaskAssigneeChanged
  | TaskTitleChanged
  | TaskDescriptionChanged
  | TaskStatusChanged
  | TaskBoardCreated
  | TaskAddedToTaskBoard
  | TaskRemovedFromTaskBoard;

export {
  TaskBoardEvents,
  createTaskAddedToTaskBoard,
  createTaskAssigneeChanged,
  createTaskBoardCreated,
  createTaskCreated,
  createTaskDescriptionChanged,
  createTaskRemovedFromTaskBoard,
  createTaskStatusChanged,
  createTaskTitleChanged,
};
