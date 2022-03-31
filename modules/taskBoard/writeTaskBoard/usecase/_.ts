import { TeamMemberRemovedFromTeamEvent } from "../../../project/domain/events.js";
import EventBus from "../../../shared/infrastructure/event-bus/event-bus.js";
import ConcurrencySafeFilesystemEventStore from "../../../shared/infrastructure/event-store/concurrency-safe-filesystem-event-store.js";
import InMemoryIndexedStorage from "../../../shared/infrastructure/indexed-storage/in-memory-indexed-storage.js";
import {
  Event,
  TaskAssigneeChangedEvent,
  TaskCreatedEvent,
} from "../../domain/events.js";
import { createTaskBoard } from "../domain/task-board.js";
import {
  applyTaskEvents,
  updateAssignee,
  updateStatus,
} from "../domain/task.js";

type ConstructorArguments = {
  eventStore: ConcurrencySafeFilesystemEventStore<Event>;
  eventBus: EventBus<TeamMemberRemovedFromTeamEvent>;
  taskAssigneeReadModelStorage: InMemoryIndexedStorage<{
    id: string;
    assigneeId: string;
  }>;
};

class TaskBoardDomainEventHandlers {
  #eventStore: ConcurrencySafeFilesystemEventStore<Event>;
  #eventBus: EventBus<TeamMemberRemovedFromTeamEvent>;
  #taskAssigneeReadModelStorage: InMemoryIndexedStorage<{
    id: string;
    assigneeId: string;
  }>;

  constructor({
    eventStore,
    eventBus,
    taskAssigneeReadModelStorage,
  }: ConstructorArguments) {
    this.#eventStore = eventStore;
    this.#eventBus = eventBus;
    this.#taskAssigneeReadModelStorage = taskAssigneeReadModelStorage;
  }

  activate() {
    this.#eventStore.subscribe("$global", (event) => {
      if (
        event.type == TaskCreatedEvent.type ||
        event.type == TaskAssigneeChangedEvent.type
      )
        this.#taskAssigneeReadModelStorage.update(event.data.taskId, {
          id: event.data.taskId,
          assigneeId: event.data.assigneeId,
        });
    });
    this.#eventBus.subscribe(
      "ProjectCreated",
      async ({ data: { taskBoardId: id } }) => {
        await this.#eventStore.save(`task-board/${id}`, createTaskBoard(id), {
          expectedVersion: 0,
        });
      }
    );
    this.#eventBus.subscribe("TeamMemberRemovedFromTeam", async (event) => {
      const taskAssignees = this.#taskAssigneeReadModelStorage.findByIndex(
        "assigneeId",
        event.data.teamMemberId
      );
      await Promise.all(
        taskAssignees.map(async (assignee) => {
          if (!assignee) return;
          const { events, currentVersion } = await this.#eventStore.load(
            `task/${assignee.id}`
          );
          const taskState = applyTaskEvents({}, events);
          const statusEvents =
            taskState.status === "in progress"
              ? updateStatus(taskState, "todo")
              : [];
          const updatedTaskState = applyTaskEvents(taskState, statusEvents);
          const assigneeEvents = updateAssignee(updatedTaskState, undefined);
          await this.#eventStore.save(
            `task/${assignee.id}`,
            [...statusEvents, ...assigneeEvents],
            { expectedVersion: currentVersion }
          );
        })
      );
    });
  }
}

export default TaskBoardDomainEventHandlers;
