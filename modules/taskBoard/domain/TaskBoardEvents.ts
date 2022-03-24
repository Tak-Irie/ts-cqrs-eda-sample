import { createEvent } from "../../shared/domain/Event";

const TaskCreatedEventClass = createEvent("TaskCreated")<{
  taskId: string;
  title: string;
  description: string;
  status: string;
  assigneeId: string;
}>();

const TaskAssigneeChangedEvent = createEvent("TaskAssigneeChanged")<{
  taskId: string;
  assigneeId: string;
}>();

const TaskTitleChangedEvent = createEvent("TaskTitleChanged")<{
  taskId: string;
  title: string;
}>();

const TaskDescriptionChangedEvent = createEvent("TaskDescriptionChanged")<{
  taskId: string;
  description: string;
}>();

const TaskStatusChangedEvent = createEvent("TaskStatusChanged")<{
  taskId: string;
  status: string;
}>();

const TaskBoardCreatedEventClass = createEvent("TaskBoardCreated")<{
  taskBoardId: string;
}>();
const TaskAddedToTaskBoardEvent = createEvent("TaskAddedToTaskBoard")<{
  taskBoardId: string;
  taskId: string;
}>();
const TaskRemovedFromTaskBoardEvent = createEvent("TaskRemovedFromTaskBoard")<{
  taskBoardId: string;
  taskId: string;
}>();

type TaskCreatedEvent = InstanceType<typeof TaskCreatedEventClass>;
type TaskAssigneeChangedEvent = InstanceType<typeof TaskAssigneeChangedEvent>;
type TaskTitleChangedEvent = InstanceType<typeof TaskTitleChangedEvent>;
type TaskDescriptionChangedEvent = InstanceType<
  typeof TaskDescriptionChangedEvent
>;
type TaskStatusChangedEvent = InstanceType<typeof TaskStatusChangedEvent>;
type TaskBoardCreatedEvent = InstanceType<typeof TaskBoardCreatedEventClass>;
type TaskAddedToTaskBoardEvent = InstanceType<typeof TaskAddedToTaskBoardEvent>;
type TaskRemovedFromTaskBoardEvent = InstanceType<
  typeof TaskRemovedFromTaskBoardEvent
>;
type TaskBoardEvents =
  | TaskCreatedEvent
  | TaskAssigneeChangedEvent
  | TaskTitleChangedEvent
  | TaskDescriptionChangedEvent
  | TaskStatusChangedEvent
  | TaskBoardCreatedEvent
  | TaskAddedToTaskBoardEvent
  | TaskRemovedFromTaskBoardEvent;

export {
  TaskBoardEvents,
  TaskCreatedEventClass,
  TaskTitleChangedEvent,
  TaskAssigneeChangedEvent,
  TaskRemovedFromTaskBoardEvent,
  TaskAddedToTaskBoardEvent,
  TaskBoardCreatedEventClass,
  TaskDescriptionChangedEvent,
  TaskStatusChangedEvent,
};
