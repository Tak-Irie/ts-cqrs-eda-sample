import { EventType } from "../../../shared/domain";

type UserCreatedEvent = EventType<
  "UserCreated",
  {
    id: string;
    userName: string;
    email: string;
    password: string;
  }
>;

type UserEmailAddressChangedEvent = EventType<
  "UserEmailAddressChangedEvent",
  { userId: string; userEmail: string }
>;

export { UserCreatedEvent, UserEmailAddressChangedEvent };
