import { JSONType, JSONEventType, jsonEvent } from "@eventstore/db-client";
import { Either, Result, right, left } from "../../../../shared/core/Result";
import { EventStore } from "../../../../shared/infrastructure/EventStore";
import { EventStoreDB } from "../../../../shared/infrastructure/implementation/EventStoreDB";
import { Message, MessageType } from "../../../../shared/usecase/Message";
import { UseCase } from "../../../../shared/usecase/UseCase";
import { EmailRegistry, User } from "../../domain";

type CreateUserArgs = {
  userName: string;
  email: string;
  password: string;
};

type UserCreatedEvent = JSONEventType<
  "UserCreated",
  {
    id: string;
    userName: string;
    email: string;
    password: string;
  }
>;

type Response = Either<Result<false>, Result<string>>;

export class CreateUserUsecase implements UseCase<CreateUserArgs, Response> {
  private eventStore: EventStoreDB;
  private emailRegistry: EmailRegistry;

  constructor(eventStore: EventStoreDB, emailRegistry: EmailRegistry) {
    this.eventStore = eventStore;
    this.emailRegistry = emailRegistry;
  }
  async execute(request: CreateUserArgs): Promise<Response> {
    // console.log("request:", request);
    const { email, password, userName } = request;

    const isTrue = this.emailRegistry.isEmailAvailable(email);

    if (!isTrue) return left(Result.fail<false>("fail"));

    const event = await User.create({ email, password, userName });
    // console.log("event:", event);
    if (event === false) return left(Result.fail<false>("fail"));

    const { data, id, metadata, type } = event;
    const userId = data.id;
    const _event = jsonEvent<UserCreatedEvent>({
      data,
      type,
    });

    const result = await this.eventStore.save<UserCreatedEvent>({
      streamID: `user/${userId}`,
      event: _event,
      expectedRevision: "no_stream",
    });

    if (!result.success) return left(Result.fail<false>("fall"));
    // console.log("result:", result);

    return right(Result.success<string>("created!"));
  }
}
