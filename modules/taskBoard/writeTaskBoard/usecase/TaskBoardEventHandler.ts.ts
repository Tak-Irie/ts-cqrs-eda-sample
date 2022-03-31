import { TeamMemberRemovedFromTeam } from "modules/project/domain/ProjectEvents";
import { EventBus } from "modules/shared/infrastructure/EventBus";
import { _EventStoreDB } from "modules/shared/infrastructure/implementation/_EventStoreDB";
import { ReadModelStorage } from "modules/shared/infrastructure/ReadModelStorage";
import { TaskBoardEvents } from "modules/taskBoard/domain/TaskBoardEvents";

type Constructor = {
  eventStore: _EventStoreDB<TaskBoardEvents>;
  eventBus: EventBus<TeamMemberRemovedFromTeam>;
  taskAssigneeReadModelStorage: ReadModelStorage;
};

class TaskBoardEventHandler {
  private eventStore: _EventStoreDB<TaskBoardEvents>;
  private eventBus: EventBus<TeamMemberRemovedFromTeam>;
  private taskAssigneeReadModelStorage: ReadModelStorage;

  constructor({
    eventStore,
    eventBus,
    taskAssigneeReadModelStorage,
  }: Constructor) {
    this.eventStore = eventStore;
    this.eventBus = eventBus;
    this.taskAssigneeReadModelStorage = taskAssigneeReadModelStorage;
  }
    activate = () => {
      this.eventStore.subscribeToAll({
        typeNameFilters:["TaskCreated","TaskAssigneeChanged"],
        eventHandler:
        async ( {data} ) => {

          await this.taskAssigneeReadModelStorage.update(data.taskId, {
            id: data.taskId,
            assigneeId: data.assigneeId,
          });
      }

      })
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
    };
  }
}

export { TaskBoardEventHandler };
