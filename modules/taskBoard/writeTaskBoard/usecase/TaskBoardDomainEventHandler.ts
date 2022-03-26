// import { EventBus } from "../../../shared/infrastructure/EventBus";
// import { EventStoreDB } from "../../../shared/infrastructure/implementation/EventStoreDB";
// import { RedisReadModelStorage } from "../../../shared/infrastructure/implementation/RedisReadModelStorage";

// import {
//   TaskBoardEvents,
//   TaskCreatedEventClass,
//   TaskAssigneeChangedEvent,
// } from "../../domain/TaskBoardEvents";

// import { createTaskBoard } from "../domain/TaskBoard";
// import { applyTaskEvents, updateAssignee, updateStatus } from "../domain/Task";
// import {
//   ProjectCreatedEvent,
//   TeamMemberRemovedFromTeamEvent,
// } from "../../../project/domain/ProjectEvents";

// export class TaskBoardDomainEventHandlers {
//   private eventStore: EventStoreDB<TaskBoardEvents>;
//   private eventBus: EventBus<
//     ProjectCreatedEvent | TeamMemberRemovedFromTeamEvent
//   >;
//   private taskAssigneeReadModelStorage: RedisReadModelStorage;
//   constructor(
//     eventStore: EventStoreDB<TaskBoardEvents>,
//     eventBus: EventBus<ProjectCreatedEvent | TeamMemberRemovedFromTeamEvent>,
//     taskAssigneeReadModelStorage: RedisReadModelStorage
//   ) {
//     this.eventStore = eventStore;
//     this.eventBus = eventBus;
//     this.taskAssigneeReadModelStorage = taskAssigneeReadModelStorage;
//   }

//   activate() {
//     const filter = [TaskCreatedEventClass.type, TaskAssigneeChangedEvent.type];
//     this.eventStore.subscribeToAll(
//       async (event) => {
//         if (
//           event.type === "TaskAssigneeChanged" ||
//           event.type === "TaskCreated"
//         ) {
//           const {
//             data: { assigneeId, taskId },
//           } = event;
//           await this.taskAssigneeReadModelStorage.update(taskId, {
//             id: taskId,
//             assigneeId: assigneeId,
//           });
//         }
//       },
//       filter,
//       "start"
//     );

//     this.eventBus.subscribe(
//       "ProjectCreated",
//       async ({ data: { taskBoardId: id } }) => {
//         const event = createTaskBoard(id);
//         await this.eventStore.save(`task-board/${id}`, event, "no_stream");
//       }
//     );

//     this.eventBus.subscribe("TeamMemberRemovedFromTeam", async ({ data }) => {
//       const taskAssignees = await this.taskAssigneeReadModelStorage.findByIndex(
//         "assigneeId",
//         data.teamMemberId
//       );

//       await Promise.all(
//         taskAssignees.map(async ({ id }) => {
//           const { events, currentVersion } = await this.eventStore.load(
//             `task/${id}`
//           );
//           const taskState = applyTaskEvents({}, events);
//           const statusEvents =
//             taskState.status === "in progress"
//               ? updateStatus(taskState, "todo")
//               : [];
//           const updatedTaskState = applyTaskEvents(taskState, statusEvents);
//           const assigneeEvents = updateAssignee(updatedTaskState, undefined);
//           await this.eventStore.save(
//             `task/${id}`,
//             [...statusEvents, ...assigneeEvents],
//             { expectedVersion: currentVersion }
//           );
//         })
//       );
//     });
//   }
// }
