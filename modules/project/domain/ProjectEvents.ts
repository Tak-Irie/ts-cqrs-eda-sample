import { Event, EventType } from "../../shared/domain";

type ProjectCreatedData = {
  id: string;
  name: string;
  ownerId: string;
  teamId: string;
  taskBoardIds: string[];
};

type ProjectCreatedEvent = EventType<"ProjectCreated", ProjectCreatedData>;

export { ProjectCreatedData, ProjectCreatedEvent };
