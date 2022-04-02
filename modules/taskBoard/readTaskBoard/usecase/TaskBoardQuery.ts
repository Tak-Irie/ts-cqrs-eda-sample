import { useMessageFactory } from "modules/shared/usecase/_Message";

const createStreamTasksOnTaskBoardQuery = useMessageFactory<
  "StreamTasksOnTaskBoard",
  { taskBoardId: string }
>({ type: "StreamTasksOnTaskBoard" });

type StreamTaskOnTaskBoard = ReturnType<
  typeof createStreamTasksOnTaskBoardQuery
>;

type TaskBoardQueries = StreamTaskOnTaskBoard;

export {
  TaskBoardQueries,
  StreamTaskOnTaskBoard,
  createStreamTasksOnTaskBoardQuery,
};
