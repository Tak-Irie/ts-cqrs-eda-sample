import { useEventFactory } from "../../shared/domain/_Event";

const createProjectCreated = useEventFactory<
  "ProjectCreated",
  {
    projectId: string;
    name: string;
    ownerId: string;
    teamId: string;
    taskBoardId: string;
  }
>({ type: "ProjectCreated" });

const createProjectRenamed = useEventFactory<
  "ProjectRenamed",
  { projectId: string; name: string }
>({ type: "ProjectRenamed" });

const createTeamMemberCreated = useEventFactory<
  "TeamMemberCreated",
  {
    teamMemberId: string;
    userId: string;
    role: string;
  }
>({ type: "TeamMemberCreated" });

const createTeamMemberRoleChanged = useEventFactory<
  "TeamMemberRoleChanged",
  {
    teamMemberId: string;
    role: string;
  }
>({ type: "TeamMemberRoleChanged" });

const createTeamCreated = useEventFactory<"TeamCreated", { teamId: string }>({
  type: "TeamCreated",
});

const createTeamMemberAddedToTeam = useEventFactory<
  "TeamMemberAddedToTeam",
  {
    teamId: string;
    teamMemberId: string;
  }
>({ type: "TeamMemberAddedToTeam" });

const createTeamMemberRemovedFromTeam = useEventFactory<
  "TeamMemberRemovedFromTeam",
  { teamId: string; teamMemberId: string }
>({ type: "TeamMemberRemovedFromTeam" });

export type ProjectCreated = ReturnType<typeof createProjectCreated>;
export type ProjectRenamed = ReturnType<typeof createProjectRenamed>;
export type TeamMemberCreated = ReturnType<typeof createTeamMemberCreated>;
export type TeamMemberRoleChanged = ReturnType<
  typeof createTeamMemberRoleChanged
>;
export type TeamCreated = ReturnType<typeof createTeamCreated>;
export type TeamMemberAddedToTeam = ReturnType<
  typeof createTeamMemberAddedToTeam
>;
export type TeamMemberRemovedFromTeam = ReturnType<
  typeof createTeamMemberRemovedFromTeam
>;

type ProjectEvents =
  | ProjectCreated
  | ProjectRenamed
  | TeamMemberCreated
  | TeamMemberAddedToTeam
  | TeamMemberRoleChanged
  | TeamCreated
  | TeamMemberRemovedFromTeam;

export {
  ProjectEvents,
  createProjectCreated,
  createProjectRenamed,
  createTeamCreated,
  createTeamMemberAddedToTeam,
  createTeamMemberCreated,
  createTeamMemberRemovedFromTeam,
  createTeamMemberRoleChanged,
};
