import { EventBus } from "../../../shared/infrastructure/EventBus";
import { EventStoreDB } from "../../../shared/infrastructure/implementation/EventStoreDB";
import { RedisReadModelStorage } from "../../../shared/infrastructure/implementation/RedisReadModelStorage";

import {
  TaskCreatedEvent,
  TaskAssigneeChangedEvent,
} from "../domain/TaskBoardEvents";

import { createTaskBoard } from "../domain/task-board.js";
import {
  applyTaskEvents,
  updateAssignee,
  updateStatus,
} from "../domain/task.js";

export class TaskBoardDomainEventHandlers<T extends { type: string }> {
  private eventStore: EventStoreDB;
  private eventBus: EventBus<T>;
  private taskAssigneeReadModelStorage: RedisReadModelStorage;
  constructor(
    eventStore: EventStoreDB,
    eventBus: EventBus<T>,
    taskAssigneeReadModelStorage: RedisReadModelStorage
  ) {
    this.eventStore = eventStore;
    this.eventBus = eventBus;
    this.taskAssigneeReadModelStorage = taskAssigneeReadModelStorage;
  }

  activate() {
    this.eventStore.subscribeToAll({
      callback: async (event) => {
        if (
          event.type instanceof
          TaskCreatedEvent[
            (TaskCreatedEvent.type, TaskAssigneeChangedEvent.type)
          ].includes(type)
        )
          await this.taskAssigneeReadModelStorage.update(data.taskId, {
            id: data.taskId,
            assigneeId: data.assigneeId,
          });
      },
      fromPosition: "start",
      typeNameFilters: [],
    });
    this.eventBus.subscribe(
      "ProjectCreated",
      async ({ data: { taskBoardId: id } }) => {
        await this.eventStore.save(`task-board/${id}`, createTaskBoard(id), {
          expectedVersion: null,
        });
      }
    );
    this.eventBus.subscribe("TeamMemberRemovedFromTeam", async ({ data }) => {
      const taskAssignees = await this.taskAssigneeReadModelStorage.findByIndex(
        "assigneeId",
        data.teamMemberId
      );
      await Promise.all(
        taskAssignees.map(async ({ id }) => {
          const { events, currentVersion } = await this.eventStore.load(
            `task/${id}`
          );
          const taskState = applyTaskEvents({}, events);
          const statusEvents =
            taskState.status === "in progress"
              ? updateStatus(taskState, "todo")
              : [];
          const updatedTaskState = applyTaskEvents(taskState, statusEvents);
          const assigneeEvents = updateAssignee(updatedTaskState, undefined);
          await this.eventStore.save(
            `task/${id}`,
            [...statusEvents, ...assigneeEvents],
            { expectedVersion: currentVersion }
          );
        })
      );
    });
  }
}
