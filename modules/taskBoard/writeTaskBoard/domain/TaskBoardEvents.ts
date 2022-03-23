import { EventType } from "../../../shared/domain";

type TaskCreatedEvent = EventType<
  "TaskCreated",
  {
    taskId: string;
    title: string;
    description: string;
    status: string | undefined;
    assigneeId: string | undefined;
  }
>;

type TaskTitleChangedEvent = EventType<
  "TaskTitleChanged",
  {
    taskId: string;
    title: string;
  }
>;
type TaskDescriptionChangedEvent = EventType<
  "TaskDescriptionChanged",
  {
    taskId: string;
    description: string;
  }
>;

type TaskAssigneeChangedEvent = EventType<
  "TaskAssigneeChanged",
  {
    taskId: string;
    assigneeId: string | undefined;
  }
>;
type TaskStatusChangedEvent = EventType<
  "TaskStatusChanged",
  {
    taskId: string;
    status: string;
  }
>;
type TaskBoardCreatedEvent = EventType<
  "TaskBoardCreated",
  {
    taskBoardId: string;
  }
>;
type TaskAddedToTaskBoardEvent = EventType<
  "TaskAddedToTaskBoard",
  {
    taskBoardId: string;
    taskId: string;
  }
>;
type TaskRemovedFromTaskBoardEvent = EventType<
  "TaskRemovedFromTaskBoard",
  { taskBoardId: string; taskId: string }
>;

export {
  TaskCreatedEvent,
  TaskTitleChangedEvent,
  TaskAssigneeChangedEvent,
  TaskRemovedFromTaskBoardEvent,
  TaskAddedToTaskBoardEvent,
  TaskBoardCreatedEvent,
  TaskDescriptionChangedEvent,
  TaskStatusChangedEvent,
};
