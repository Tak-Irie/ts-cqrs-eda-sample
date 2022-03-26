import { EventStore } from "../../shared/infrastructure/EventStore";

class TaskBoardCommandHandler {
  private eventStore: EventStore;
  constructor(eventStore: EventStore) {
    this.eventStore = eventStore;
  }
}
