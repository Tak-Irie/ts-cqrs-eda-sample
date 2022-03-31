import { useMessageFactory } from "modules/shared/usecase/_Message";

const createAddNewTaskToTaskBoard = useMessageFactory<
  "AddNewTaskToTaskBoard",
  {
    taskId: string;
    taskBoardId: string;
    title: string;
    description: string;
    status: string | "NONE";
    assigneeId: string | "NONE";
  }
>({ type: "AddNewTaskToTaskBoard" });
const createUpdateTaskTitle = useMessageFactory<
  "UpdateTaskTitle",
  {
    taskId: string;
    title: string;
  }
>({ type: "UpdateTaskTitle" });
const createUpdateTaskDescription = useMessageFactory<
  "UpdateTaskDescription",
  { taskId: string; description: string }
>({ type: "UpdateTaskDescription" });
const createUpdateTaskStatus = useMessageFactory<
  "UpdateTaskStatus",
  {
    taskId: string;
    status: string;
  }
>({ type: "UpdateTaskStatus" });
const createUpdateTaskAssignee = useMessageFactory<
  "UpdateTaskAssignee",
  {
    taskId: string;
    assigneeId: string;
  }
>({ type: "UpdateTaskAssignee" });
const createRemoveTaskFromTaskBoard = useMessageFactory<
  "RemoveTaskFromTaskBoard",
  { taskBoardId: string; taskId: string }
>({ type: "RemoveTaskFromTaskBoard" });

type AddNewTaskToTaskBoard = ReturnType<typeof createAddNewTaskToTaskBoard>;
type UpdateTaskTitle = ReturnType<typeof createUpdateTaskTitle>;
type UpdateTaskDescription = ReturnType<typeof createUpdateTaskDescription>;
type UpdateTaskStatus = ReturnType<typeof createUpdateTaskStatus>;
type UpdateTaskAssignee = ReturnType<typeof createUpdateTaskAssignee>;
type RemoveTaskFromTaskBoard = ReturnType<typeof createRemoveTaskFromTaskBoard>;

type TaskBoardCommands =
  | AddNewTaskToTaskBoard
  | UpdateTaskTitle
  | UpdateTaskDescription
  | UpdateTaskStatus
  | UpdateTaskAssignee
  | RemoveTaskFromTaskBoard;

export {
  TaskBoardCommands,
  AddNewTaskToTaskBoard,
  UpdateTaskTitle,
  UpdateTaskDescription,
  UpdateTaskStatus,
  UpdateTaskAssignee,
  RemoveTaskFromTaskBoard,
  createAddNewTaskToTaskBoard,
  createRemoveTaskFromTaskBoard,
  createUpdateTaskAssignee,
  createUpdateTaskDescription,
  createUpdateTaskStatus,
  createUpdateTaskTitle,
};
