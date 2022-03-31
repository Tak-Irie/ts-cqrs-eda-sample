import {
  createTeamMemberRoleChanged,
  ProjectEvents,
} from "modules/project/domain/ProjectEvents";
import { _MessageHandler } from "modules/shared/usecase/_MessageHandler";
import { _EventStoreDB } from "../../../shared/infrastructure/implementation/_EventStoreDB";
import {
  applyProjectEvents,
  createProject,
  renameProject,
} from "../domain/Project";
import Role from "../domain/Role";
import {
  addTeamMember,
  applyTeamEvents,
  removeTeamMember,
} from "../domain/Team";
import { applyTeamMemberEvents, createTeamMember } from "../domain/TeamMember";
import {
  AddTeamMemberToTeam,
  CreateProject,
  ProjectCommands,
  RemoveTeamMemberFromTeam,
  UpdateProjectName,
  UpdateTeamMemberRole,
} from "./Commands";

class ProjectCommandHandler implements _MessageHandler<ProjectCommands> {
  private eventStore: _EventStoreDB<ProjectEvents>;

  constructor({ eventStore }: { eventStore: _EventStoreDB<ProjectEvents> }) {
    this.eventStore = eventStore;
  }

  async handleCreateProject({ data }: CreateProject) {
    const { projectId, name, ownerId, teamId, taskBoardId } = data;
    const events = createProject({
      id: projectId,
      name,
      ownerId,
      teamId,
      taskBoardId,
    });
    await this.eventStore.save({
      streamId: `project/${projectId}`,
      event: events,
      expectedRevision: "no_stream",
    });
  }

  async handleUpdateProjectName({
    data: { projectId: id, name },
  }: UpdateProjectName) {
    const result = await this.eventStore.load(`project/${id}`);
    if (result === false) return false;

    const newEvents = renameProject(
      applyProjectEvents({ id }, result.events),
      name
    );
    await this.eventStore.save({
      streamId: `project/${id}`,
      event: newEvents,
      expectedRevision: result.currentVersion,
    });
  }

  async handleAddTeamMemberToTeam(command: AddTeamMemberToTeam) {
    const {
      data: { teamId, teamMemberId, userId, role },
    } = command;
    const teamMemberEvents = createTeamMember({
      id: teamMemberId,
      userId,
      role: new Role(role),
    });
    await this.eventStore.save({
      streamId: `team-member/${teamMemberId}`,
      event: teamMemberEvents,
      expectedRevision: "any",
    });
    const result = await this.eventStore.load(`team/${teamId}`);
    if (result === false) return false;
    const newTeamEvents = addTeamMember(
      applyTeamEvents({ id: teamId }, result.events),
      teamMemberId
    );
    await this.eventStore.save({
      streamId: `team/${teamId}`,
      event: newTeamEvents,
      expectedRevision: result.currentVersion,
    });
  }

  async handleRemoveTeamMemberFromTeam({
    data: { teamId, teamMemberId },
  }: RemoveTeamMemberFromTeam) {
    const result = await this.eventStore.load(`team/${teamId}`);
    if (result === false) return false;

    const newEvents = removeTeamMember(
      applyTeamEvents({ id: teamId }, result.events),
      teamMemberId
    );
    await this.eventStore.save({
      streamId: `team/${teamId}`,
      event: newEvents,
      expectedRevision: result.currentVersion,
    });
  }

  async handleUpdateTeamMemberRole({
    data: { teamMemberId, role },
  }: UpdateTeamMemberRole) {
    const result = await this.eventStore.load(`team-member/${teamMemberId}`);

    if (result === false) return false;

    const newEvents = createTeamMemberRoleChanged({
      teamMemberId: applyTeamMemberEvents({ id: teamMemberId }, result.events)
        .id!,
      role: new Role(role).name,
    });
    await this.eventStore.save({
      streamId: `project/${teamMemberId}`,
      event: newEvents,
      expectedRevision: result.currentVersion,
    });
  }
}

export { ProjectCommandHandler };
