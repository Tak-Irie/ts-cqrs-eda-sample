import { RedisReadModelStorage } from "../../../shared/infrastructure/implementation/RedisReadModelStorage";
import { _MessageHandler } from "../../../shared/usecase/_MessageHandler";
import { deserializeJSON, serializeJSON } from "../../../shared/util/json";
import { readAllStream } from "../../../shared/util/Stream";
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

  async handleStreamTasksOnTaskBoard({
    data: { taskBoardId },
  }: StreamTaskOnTaskBoard) {
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

    const data = await readAllStream(taskBoardStream);

    return deserializeJSON(data);
  }
}

export { TaskBoardQueryHandler };
