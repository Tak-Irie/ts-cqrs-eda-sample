import { RedisReadModelStorage } from "../../../shared/infrastructure/implementation/RedisReadModelStorage";
import { _EventStoreDB } from "../../../shared/infrastructure/implementation/_EventStoreDB";
import { useMessageForwarder } from "../../../shared/usecase/MessageForwarder";
import {
  TaskAddedToTaskBoard,
  TaskAssigneeChanged,
  TaskBoardEvents,
  TaskCreated,
  TaskDescriptionChanged,
  TaskRemovedFromTaskBoard,
  TaskStatusChanged,
  TaskTitleChanged,
} from "../../../taskBoard/domain/TaskBoardEvents";

type TaskChangeArg = {
  taskId: string;
  update: {
    [key: string]: string;
  };
};

type PublishChangeArg = {
  taskBoardId: string;
  task: {
    [key: string]: string;
  };
};

class TaskBoardReadModelProjection {
  private eventStore;
  private taskReadModelStorage;

  constructor({
    eventStore,
    readModelStorage,
  }: {
    eventStore: _EventStoreDB<TaskBoardEvents>;
    readModelStorage: RedisReadModelStorage;
  }) {
    this.eventStore = eventStore;
    this.taskReadModelStorage = readModelStorage;
  }

  async activate() {
    await this.eventStore.subscribeToAll({
      typeNameFilters: [
        "TaskAddedToTaskBoard",
        "TaskAssigneeChanged",
        "TaskCreated",
        "TaskDescriptionChanged",
        "TaskRemovedFromTaskBoard",
        "TaskStatusChanged",
        "TaskTitleChanged",
      ],
      eventHandler: async (event) => {
        this.handleEvent(event);
      },
    });
  }

  private handleEvent = (event: TaskBoardEvents) =>
    useMessageForwarder(this)(event);

  async handleTaskCreated({ data }: TaskCreated) {
    const { taskId, title, description, status, assigneeId } = data;
    const createdTask = { id: taskId, title, description, status, assigneeId };

    await this.taskReadModelStorage.update({
      id: taskId,
      updates: createdTask,
    });
    const task = await this.taskReadModelStorage.load({ id: taskId });

    if (task.taskBoardId)
      this.publishChangeMessage({
        taskBoardId: task.taskBoardId,
        task,
      });
  }

  async handleTaskAddedToTaskBoard({
    data: { taskId, taskBoardId },
  }: TaskAddedToTaskBoard) {
    await this.taskReadModelStorage.update({
      id: taskId,
      updates: { taskBoardId },
    });
    this.publishChangeMessage({
      taskBoardId,
      task: await this.taskReadModelStorage.load({ id: taskId }),
    });
  }

  async handleTaskRemovedFromTaskBoard({
    data: { taskId, taskBoardId },
  }: TaskRemovedFromTaskBoard) {
    await this.taskReadModelStorage.delete({
      id: taskId,
    });
    this.publishChangeMessage({
      taskBoardId,
      task: await this.taskReadModelStorage.load({ id: taskId }),
    });
  }

  async handleTaskTitleChanged({ data: { taskId, title } }: TaskTitleChanged) {
    await this.handleTaskChange({ taskId, update: { title } });
  }

  async handleTaskDescriptionChanged({
    data: { taskId, description },
  }: TaskDescriptionChanged) {
    await this.handleTaskChange({ taskId, update: { description } });
  }

  async handleTaskAssigneeChanged({
    data: { taskId, assigneeId },
  }: TaskAssigneeChanged) {
    await this.handleTaskChange({ taskId, update: { assigneeId } });
  }

  async handleTaskStatusChanged({
    data: { taskId, status },
  }: TaskStatusChanged) {
    await this.handleTaskChange({ taskId, update: { status } });
  }

  async handleTaskChange({ taskId, update }: TaskChangeArg) {
    await this.taskReadModelStorage.update({ id: taskId, updates: update });
    const task = await this.taskReadModelStorage.load({ id: taskId });
    if (task.taskBoardId)
      this.publishChangeMessage({ taskBoardId: task.taskBoardId, task });
  }

  private publishChangeMessage({ taskBoardId, task }: PublishChangeArg) {
    this.taskReadModelStorage.publishChangeMessage({
      topic: `TaskBoard/${taskBoardId}`,
      message: task,
    });
  }
}

export default TaskBoardReadModelProjection;
