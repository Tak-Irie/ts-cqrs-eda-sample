import { EventStoreDB } from "../../../shared/infrastructure/implementation/EventStoreDB";
import {
  UserCreatedEvent,
  UserEmailAddressChangedEvent,
} from "../domain/UserEvents";

import { EmailRegistry } from "../domain/EmailRegistry";
import { UserEmail } from "../domain/UserEmail";

type EmailRelatedEvent =
  | UserCreatedEvent["type"]
  | UserEmailAddressChangedEvent["type"];

class EmailRegistryProjection {
  private emailRegistry: EmailRegistry;
  private eventStore: EventStoreDB;

  constructor(emailRegistry: EmailRegistry, eventStore: EventStoreDB) {
    this.emailRegistry = emailRegistry;
    this.eventStore = eventStore;
  }

  activate() {
    const filter: EmailRelatedEvent[] = [
      "UserCreated",
      "UserEmailAddressChangedEvent",
    ];
    this.eventStore.subscribeToAll({
      callback: this.handleEvent,
      typeNameFilters: filter,
      fromPosition: "start",
    });
    // this.eventStore.subscribeToAll(callback:(event: AllStreamRecordedEvent) => {
    //   if (event.type ===  ) this.handleEvent(event);
    // });
  }

  handleEvent(event: any) {
    try {
      this.emailRegistry.setUserEmailAddress(
        event.data.userId,
        UserEmail.create(event.data.emailAddress).getValue().getValue()
      );
    } catch (err) {
      console.log("err:", err);
    }
  }
}

export default EmailRegistryProjection;
