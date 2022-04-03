import { _EventStoreDB } from "../../../shared/infrastructure/implementation/_EventStoreDB";
import { _MessageHandler } from "../../../shared/usecase/_MessageHandler";
import { TaskBoardEvents } from "../../../taskBoard/domain/TaskBoardEvents";
import {
  createTask,
  updateTitle,
  applyTaskEvents,
  updateDescription,
  updateAssignee,
  updateStatus,
} from "../domain/Task";
import { addTask, applyTaskBoardEvents, removeTask } from "../domain/TaskBoard";

import {
  AddNewTaskToTaskBoard,
  RemoveTaskFromTaskBoard,
  UpdateTaskAssignee,
  UpdateTaskDescription,
  UpdateTaskStatus,
  UpdateTaskTitle,
} from "./TaskBoardCommands";

import type { TaskBoardCommands } from "./TaskBoardCommands";
import { generateULID } from "../../../shared/util/generateId";
class TaskBoardCommandHandler implements _MessageHandler<TaskBoardCommands> {
  private eventStore: _EventStoreDB<TaskBoardEvents>;

  constructor(eventStore: _EventStoreDB<TaskBoardEvents>) {
    this.eventStore = eventStore;
  }

  async handleAddNewTaskToTaskBoard({ data }: AddNewTaskToTaskBoard) {
    try {
      const { taskId, taskBoardId, title, description, status, assigneeId } =
        data;

      const _id = generateULID();
      const events = createTask({
        id: _id,
        title,
        description,
        status,
        assigneeId,
      });
      await this.eventStore.save({
        streamId: `task/${_id}`,
        event: events,
        expectedRevision: "no_stream",
      });
      const result = await this.eventStore.load(`task-board/${taskBoardId}`);

      if (result === false) return false;

      const newTaskBoardEvents = addTask(
        applyTaskBoardEvents({}, result.events),
        _id
      );

      await this.eventStore.save({
        streamId: `task-board/${taskBoardId}`,
        event: newTaskBoardEvents,
        expectedRevision: result.currentVersion,
      });

      return true;
    } catch (err) {
      console.error("err:", err);
    }
  }

  async handleUpdateTaskTitle({ data }: UpdateTaskTitle) {
    const { taskId, title } = data;
    const result = await this.eventStore.load(`task/${taskId}`);

    if (result === false) return false;

    const newEvents = updateTitle(applyTaskEvents({}, result.events), title);
    await this.eventStore.save({
      streamId: `task/${taskId}`,
      event: newEvents,
      expectedRevision: result.currentVersion,
    });

    return true;
  }

  async handleUpdateTaskDescription({ data }: UpdateTaskDescription) {
    const { description, taskId } = data;

    const result = await this.eventStore.load(`task/${taskId}`);
    if (result === false) return false;

    const { currentVersion, events } = result;
    const newEvents = updateDescription(
      applyTaskEvents({}, events),
      description
    );
    await this.eventStore.save({
      streamId: `task/${taskId}`,
      event: newEvents,
      expectedRevision: currentVersion,
    });

    return true;
  }

  async handleUpdateTaskAssignee({ data }: UpdateTaskAssignee) {
    const { assigneeId, taskId } = data;
    const result = await this.eventStore.load(`task/${taskId}`);
    if (result === false) return false;
    const { currentVersion, events } = result;
    const newEvents = updateAssignee(applyTaskEvents({}, events), assigneeId);
    await this.eventStore.save({
      streamId: `task/${taskId}`,
      event: newEvents,
      expectedRevision: currentVersion,
    });

    return true;
  }

  async handleUpdateTaskStatus({ data }: UpdateTaskStatus) {
    const { status, taskId } = data;
    const result = await this.eventStore.load(`task/${taskId}`);
    if (result === false) return false;

    const { currentVersion, events } = result;
    const newEvents = updateStatus(applyTaskEvents({}, events), status);
    await this.eventStore.save({
      streamId: `task/${taskId}`,
      event: newEvents,
      expectedRevision: currentVersion,
    });

    return true;
  }

  async handleRemoveTaskFromTaskBoard({ data }: RemoveTaskFromTaskBoard) {
    const { taskBoardId, taskId } = data;
    const result = await this.eventStore.load(`task-board/${taskBoardId}`);
    if (result === false) return false;
    const { currentVersion, events } = result;

    const newEvents = removeTask(applyTaskBoardEvents({}, events), taskId);
    await this.eventStore.save({
      streamId: `task-board/${taskBoardId}`,
      event: newEvents,
      expectedRevision: currentVersion,
    });
  }
}

export { TaskBoardCommandHandler };
