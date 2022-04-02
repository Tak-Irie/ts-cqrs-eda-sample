import { RedisReadModelStorage } from "modules/shared/infrastructure/implementation/RedisReadModelStorage";
import { _MessageHandler } from "modules/shared/usecase/_MessageHandler";
import { Readable } from "stream";
import { StreamTaskOnTaskBoard, TaskBoardQueries } from "./TaskBoardQuery";

class TaskBoardQueryHandler implements _MessageHandler<TaskBoardQueries> {
  private taskReadModelStorage: RedisReadModelStorage;

  constructor({
    readModelStorage,
  }: {
    readModelStorage: RedisReadModelStorage;
  }) {
    this.taskReadModelStorage = readModelStorage;
  }

  async handleStreamTasksOnTaskBoard({ data }: StreamTaskOnTaskBoard) {
    const { taskBoardId } = data;
    const taskBoardStream = new Readable({ objectMode: true, read() {} });
    taskBoardStream.push(
      await this.taskReadModelStorage.findByIndex({
        index: "taskBoardId",
        indexValue: taskBoardId,
      })
    );

    this.taskReadModelStorage.subscribeToChanges({
      topic: `TaskBoard/${taskBoardId}`,
      callback: (changedTasks) => taskBoardStream.push(changedTasks),
    });

    return taskBoardStream;
  }
}

export { TaskBoardQueryHandler };
