import {
  createProjectCreated,
  createProjectRenamed,
} from "../../domain/ProjectEvents";

type State = { id?: string };

const applyProjectEvents = (state: State, events: Event[]) =>
  events.reduce(applyEvent, state);

const applyEvent = (state: State, _: Event) => ({ ...state });

const createProject = ({
  id: projectId,
  name,
  ownerId,
  teamId,
  taskBoardId,
}: {
  id: string;
  name: string;
  ownerId: string;
  teamId: string;
  taskBoardId: string;
}) => {
  return [
    createProjectCreated({ projectId, name, ownerId, teamId, taskBoardId }),
  ];
};

const renameProject = (state: State, name: string) => {
  return [createProjectRenamed({ projectId: state.id!, name })];
};

export { applyProjectEvents, createProject, renameProject };
