import { useMessageFactory } from "../../../shared/usecase/_Message";

const createStreamTasksOnTaskBoard = useMessageFactory<
  "StreamTasksOnTaskBoard",
  { taskBoardId: string }
>({ type: "StreamTasksOnTaskBoard" });

type StreamTaskOnTaskBoard = ReturnType<typeof createStreamTasksOnTaskBoard>;

type TaskBoardQueries = StreamTaskOnTaskBoard;

export {
  TaskBoardQueries,
  StreamTaskOnTaskBoard,
  createStreamTasksOnTaskBoard,
};
