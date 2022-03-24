import { createEvent } from "../../shared/domain";

const ProjectCreatedEvent = createEvent("ProjectCreated")<{
  projectId: string;
  name: string;
  ownerId: string;
  teamId: string;
  taskBoardId: string;
}>();
const ProjectRenamedEvent =
  createEvent("ProjectRenamed")<{ projectId: string; name: string }>();
const TeamMemberCreatedEvent = createEvent("TeamMemberCreated")<{
  teamMemberId: string;
  userId: string;
  role: string;
}>();
const TeamMemberRoleChangedEvent = createEvent("TeamMemberRoleChanged")<{
  teamMemberId: string;
  role: string;
}>();
const TeamCreatedEvent = createEvent("TeamCreated")<{ teamId: string }>();
const TeamMemberAddedToTeamEvent = createEvent("TeamMemberAddedToTeam")<{
  teamId: string;
  teamMemberId: string;
}>();
const TeamMemberRemovedFromTeamEvent = createEvent(
  "TeamMemberRemovedFromTeam"
)<{ teamId: string; teamMemberId: string }>();

type ProjectCreatedEvent = InstanceType<typeof ProjectCreatedEvent>;
type ProjectRenamedEvent = InstanceType<typeof ProjectRenamedEvent>;
type TeamMemberCreatedEvent = InstanceType<typeof TeamMemberCreatedEvent>;
type TeamMemberRoleChangedEvent = InstanceType<
  typeof TeamMemberRoleChangedEvent
>;
type TeamCreatedEvent = InstanceType<typeof TeamCreatedEvent>;
type TeamMemberAddedToTeamEvent = InstanceType<
  typeof TeamMemberAddedToTeamEvent
>;
type TeamMemberRemovedFromTeamEvent = InstanceType<
  typeof TeamMemberRemovedFromTeamEvent
>;

type ProjectEvents =
  | ProjectCreatedEvent
  | ProjectRenamedEvent
  | TeamMemberCreatedEvent
  | TeamMemberAddedToTeamEvent
  | TeamMemberRoleChangedEvent
  | TeamCreatedEvent
  | TeamMemberRemovedFromTeamEvent;

export {
  ProjectEvents,
  ProjectCreatedEvent,
  ProjectRenamedEvent,
  TeamMemberCreatedEvent,
  TeamMemberRoleChangedEvent,
  TeamCreatedEvent,
  TeamMemberAddedToTeamEvent,
  TeamMemberRemovedFromTeamEvent,
};
