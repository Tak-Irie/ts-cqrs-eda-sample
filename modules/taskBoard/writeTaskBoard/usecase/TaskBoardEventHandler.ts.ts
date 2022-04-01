import {
  ProjectCreated,
  TeamMemberRemovedFromTeam,
} from "modules/project/domain/ProjectEvents";
import { EventBus } from "modules/shared/infrastructure/EventBus";
import { _EventStoreDB } from "modules/shared/infrastructure/implementation/_EventStoreDB";
import { RedisReadModelStorage } from "modules/shared/infrastructure/implementation/RedisReadModelStorage";
import { TaskBoardEvents } from "modules/taskBoard/domain/TaskBoardEvents";
import { createTaskBoard } from "../domain/TaskBoard";
import { applyTaskEvents, updateAssignee, updateStatus } from "../domain/Task";

export type HandledEvent = TeamMemberRemovedFromTeam | ProjectCreated;

type Constructor = {
  eventStore: _EventStoreDB<TaskBoardEvents>;
  eventBus: EventBus<HandledEvent>;
  taskAssigneeReadModelStorage: RedisReadModelStorage;
};

class TaskBoardEventHandler {
  private eventStore: _EventStoreDB<TaskBoardEvents>;
  private eventBus: EventBus<HandledEvent>;
  private taskAssigneeReadModelStorage: RedisReadModelStorage;

  constructor({
    eventStore,
    eventBus,
    taskAssigneeReadModelStorage,
  }: Constructor) {
    this.eventStore = eventStore;
    this.eventBus = eventBus;
    this.taskAssigneeReadModelStorage = taskAssigneeReadModelStorage;
  }
  activate() {
    this.eventStore.subscribeToAll({
      typeNameFilters: ["TaskCreated", "TaskAssigneeChanged"],
      eventHandler: async (event) => {
        if (
          event.type === "TaskCreated" ||
          event.type === "TaskAssigneeChanged"
        ) {
          const { assigneeId, taskId } = event.data;
          await this.taskAssigneeReadModelStorage.update({
            id: taskId,
            updates: {
              id: taskId,
              assigneeId: assigneeId,
            },
          });
        }
      },
    });
    this.eventBus.subscribe({
      eventType: "ProjectCreated",
      subscriber: async (event) => {
        if (event.type === "ProjectCreated") {
          const { taskBoardId } = event.data;
          await this.eventStore.save({
            streamId: `task-board/${taskBoardId}`,
            event: createTaskBoard(taskBoardId),
            expectedRevision: "no_stream",
          });
        }
      },
    });

    this.eventBus.subscribe({
      eventType: "TeamMemberRemovedFromTeam",
      subscriber: async (event) => {
        if (event.type === "TeamMemberRemovedFromTeam") {
          const { teamMemberId } = event.data;
          const taskAssignees =
            await this.taskAssigneeReadModelStorage.findByIndex({
              index: "assigneeId",
              indexValue: teamMemberId,
            });

          await Promise.all(
            taskAssignees.map(async ({ id }) => {
              const result = await this.eventStore.load(`task/${id}`);
              if (result === false) return false;
              const { events, currentVersion } = result;
              const taskState = applyTaskEvents({}, events);

              const statusEvents =
                taskState.status === "in progress"
                  ? updateStatus(taskState, "todo")
                  : [];

              const updatedTaskState = applyTaskEvents(taskState, statusEvents);
              const assigneeEvents = updateAssignee(
                updatedTaskState,
                undefined
              );

              await this.eventStore.save({
                streamId: `task/${id}`,
                event: [...statusEvents, ...assigneeEvents],
                expectedRevision: currentVersion,
              });
            })
          );
        }
      },
    });
  }
}

export { TaskBoardEventHandler };
