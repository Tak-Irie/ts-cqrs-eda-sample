import { verify } from "../../../shared/util/verify";
import {
  TaskBoardEvents,
  createTaskAssigneeChanged,
  createTaskStatusChanged,
  createTaskDescriptionChanged,
  createTaskTitleChanged,
  createTaskCreated,
} from "../../domain/TaskBoardEvents";

type State = { id?: string; status?: string; assigneeId?: string };

const validStatus = ["todo", "in progress", "done"];

const applyTaskEvents = (state: State, events: TaskBoardEvents[]) =>
  events.reduce(applyEvent, state);

const applyEvent = (state: State, event: TaskBoardEvents) => {
  if (event.type === "TaskCreated")
    return {
      ...state,
      id: event.data.taskId,
      assigneeId: event.data.assigneeId,
    };
  if (event.type === "TaskStatusChanged")
    return { ...state, status: event.data.status };
  if (event.type === "TaskAssigneeChanged")
    return { ...state, assigneeId: event.data.assigneeId };
  return { ...state };
};

const createTask = ({
  id,
  title,
  description = "",
  status = "todo",
  assigneeId,
}: {
  id: string;
  title: string;
  description?: string;
  status?: string;
  assigneeId: string;
}) => {
  verify("valid title", !!title);
  verify("valid status", validStatus.includes(status));
  verify("active task assignee", status !== "in progress" || !!assigneeId);
  return [
    createTaskCreated({
      taskId: id,
      title,
      description,
      status,
      assigneeId,
    }),
  ];
};

const updateTitle = (state: State, title: string) => {
  verify("valid title", !!title);
  return [createTaskTitleChanged({ taskId: state.id!, title })];
};

const updateDescription = (state: State, description: string) => [
  createTaskDescriptionChanged({ taskId: state.id!, description }),
];

const updateStatus = (state: State, status: string) => {
  verify("valid status", validStatus.includes(status));
  verify(
    "active task assignee",
    status !== "in progress" || !!state.assigneeId
  );
  return [createTaskStatusChanged({ taskId: state.id!, status })];
};

const updateAssignee = (state: State, assigneeId?: string) => {
  verify(
    "active task assignee",
    state.status !== "in progress" || !!assigneeId
  );
  if (!assigneeId) assigneeId = "NOTHING";
  return [createTaskAssigneeChanged({ taskId: state.id!, assigneeId })];
};

export {
  applyTaskEvents,
  createTask,
  updateTitle,
  updateDescription,
  updateStatus,
  updateAssignee,
};
