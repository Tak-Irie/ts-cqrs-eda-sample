import { Entity, Event, UniqueEntityID } from "../../../shared/domain";
import {
  ProjectCreatedData,
  ProjectCreatedEvent,
} from "../../domain/ProjectEvents";

type ProjectProps = {
  id: string;
  name: string;
  ownerId: string;
  teamId: string;
  taskBoardId: string;
};

export class Project extends Entity<ProjectProps> {
  private constructor(readonly props: ProjectProps, id?: UniqueEntityID) {
    super(props, id);
  }
  static createProject(args: ProjectCreatedData) {
    const event: ProjectCreatedEvent = {
      type: "ProjectCreated",
      data: {
        ...args,
        id: new UniqueEntityID().toString(),
      },
      metadata: { NONE: "NONE" },
    };

    return event;
  }
}
