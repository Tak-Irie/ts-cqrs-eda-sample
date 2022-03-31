import { useMessageFactory } from "modules/shared/usecase/_Message";

const createCreateProject = useMessageFactory<
  "CreateProject",
  {
    projectId: string;
    name: string;
    ownerId: string;
    teamId: string;
    taskBoardId: string;
  }
>({ type: "CreateProject" });

const createAddTeamMemberToTeam = useMessageFactory<
  "AddTeamMemberToTeam",
  { teamId: string; teamMemberId: string; userId: string; role: string }
>({ type: "AddTeamMemberToTeam" });

const createRemoveTeamMemberFromTeam = useMessageFactory<
  "RemoveTeamMemberFromTeam",
  {
    teamId: string;
    teamMemberId: string;
  }
>({ type: "RemoveTeamMemberFromTeam" });

const createUpdateTeamMemberRole = useMessageFactory<
  "UpdateTeamMemberRole",
  { teamMemberId: string; role: string }
>({ type: "UpdateTeamMemberRole" });

const createUpdateProjectName = useMessageFactory<
  "UpdateProjectName",
  {
    projectId: string;
    name: string;
  }
>({ type: "UpdateProjectName" });

export type CreateProject = ReturnType<typeof createCreateProject>;
export type AddTeamMemberToTeam = ReturnType<typeof createAddTeamMemberToTeam>;
export type RemoveTeamMemberFromTeam = ReturnType<
  typeof createRemoveTeamMemberFromTeam
>;
export type UpdateTeamMemberRole = ReturnType<
  typeof createUpdateTeamMemberRole
>;
export type UpdateProjectName = ReturnType<typeof createUpdateProjectName>;

type ProjectCommands =
  | CreateProject
  | AddTeamMemberToTeam
  | RemoveTeamMemberFromTeam
  | UpdateTeamMemberRole
  | UpdateProjectName;

export {
  ProjectCommands,
  createAddTeamMemberToTeam,
  createCreateProject,
  createRemoveTeamMemberFromTeam,
  createUpdateProjectName,
  createUpdateTeamMemberRole,
};
