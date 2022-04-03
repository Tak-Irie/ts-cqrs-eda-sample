import { Resolvers, TaskBoard } from "./generated/resolversTypes";
import { useReadTaskBoard, useWriteTaskBoard } from "@ddd/modules";
import { createStreamTasksOnTaskBoard } from "@ddd/modules/taskBoard/readTaskBoard/usecase/TaskBoardQuery";
import { createAddNewTaskToTaskBoard } from "@ddd/modules/taskBoard/writeTaskBoard/usecase/TaskBoardCommands";

const taskBoardResolver: Resolvers = {
  Query: {
    taskBoard: async (_, arg) => {
      const req = createStreamTasksOnTaskBoard({ taskBoardId: arg.id });
      const res = await useReadTaskBoard().handleStreamTasksOnTaskBoard(req);
      console.log("res:", res);
      return {
        id: "temp",
        tasks: [{ id: "temp1" }],
      };
    },
  },
  Mutation: {
    addNewTaskToTaskBoard: async (_, arg) => {
      console.log("arg:", arg);
      const req = createAddNewTaskToTaskBoard({ ...arg });
      const res = await useWriteTaskBoard().handleAddNewTaskToTaskBoard(req);
      console.log("res:", res);
      return res;
    },
  },
};

export { taskBoardResolver };
