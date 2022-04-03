import { useEventFactory } from "../../shared/domain/_Event";

const createUserRegistered = useEventFactory<
  "UserRegistered",
  {
    id: string;
    userName: string;
    email: string;
    password: string;
  }
>({ type: "UserRegistered" });

type UserRegistered = ReturnType<typeof createUserRegistered>;

type UserEvents = UserRegistered;

export { UserEvents, createUserRegistered };
