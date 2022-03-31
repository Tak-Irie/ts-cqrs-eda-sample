import {
  ProjectEvents,
  createTeamMemberCreated,
  createTeamMemberRoleChanged,
} from "../../domain/ProjectEvents";

import Role from "./Role";

type State = { id?: string };

const applyTeamMemberEvents = (state: State, events: ProjectEvents[]) =>
  events.reduce(applyEvent, state);

const applyEvent = (state: State, event: ProjectEvents) => ({ ...state });

const createTeamMember = ({
  id,
  userId,
  role,
}: {
  id: string;
  userId: string;
  role: Role;
}) => [createTeamMemberCreated({ teamMemberId: id, userId, role: role.name })];

const updateTeamMemberRole = (state: State, role: Role) => [
  createTeamMemberRoleChanged({ teamMemberId: state.id!, role: role.name }),
];

export { applyTeamMemberEvents, createTeamMember, updateTeamMemberRole };
