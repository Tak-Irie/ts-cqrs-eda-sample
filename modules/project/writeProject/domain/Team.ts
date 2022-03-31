import {
  createTeamCreated,
  createTeamMemberAddedToTeam,
  createTeamMemberRemovedFromTeam,
  ProjectEvents,
} from "../../domain/ProjectEvents";

type State = { id?: string; teamMemberIds?: string[] };

const applyTeamEvents = (state: State, events: ProjectEvents[]) =>
  events.reduce(applyEvent, { teamMemberIds: [], ...state });

const applyEvent = (state: State, event: ProjectEvents) => {
  if (event.type === "TeamMemberAddedToTeam")
    return {
      ...state,
      teamMemberIds: ((state as State).teamMemberIds || []).concat(
        event.data.teamMemberId
      ),
    };
  if (event.type === "TeamMemberRemovedFromTeam")
    return {
      ...state,
      teamMemberIds: ((state as State).teamMemberIds || []).filter(
        (id) => id !== event.data.teamMemberId
      ),
    };
  return { ...state };
};

const createTeam = (id: string) => [createTeamCreated({ teamId: id })];

const addTeamMember = (state: State, teamMemberId: string) => {
  // verify("team member is new", !state.teamMemberIds?.includes(teamMemberId));
  return [createTeamMemberAddedToTeam({ teamId: state.id!, teamMemberId })];
};

const removeTeamMember = (state: State, teamMemberId: string) => {
  const indexToRemove = state.teamMemberIds?.indexOf(teamMemberId);
  if (indexToRemove == -1) return [];
  return [createTeamMemberRemovedFromTeam({ teamId: state.id!, teamMemberId })];
};

export { applyTeamEvents, createTeam, addTeamMember, removeTeamMember };
