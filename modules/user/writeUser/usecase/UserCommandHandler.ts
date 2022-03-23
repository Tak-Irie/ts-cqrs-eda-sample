// import { Either, left, Result } from "../../../shared/core/Result";
// import { createEventType } from "../../../shared/domain/Event";
// import { EventStoreDB } from "../../../shared/infrastructure/implementation/EventStoreDB";
// import { generateID } from "../../../shared/util/generateID";
// import {
//   User,
//   EmailRegistry,
//   UserEmail,
//   UserName,
//   UserPassword,
// } from "../domain";
// import { EmailAlreadyExistsError } from "./CreateUser/UseCaseError";
// import { CreateUserCommand } from "./UserCommands";

// type Response = Either<EmailAlreadyExistsError, Result<User>>;

// export class UserCommandHandler {
//   private eventStore: EventStoreDB;
//   private emailRegistry: EmailRegistry;
//   constructor(eventStore: EventStoreDB, emailRegistry: EmailRegistry) {
//     this.eventStore = eventStore;
//     this.emailRegistry = emailRegistry;
//   }

//   async createUserCommand(command: CreateUserCommand): Promise<Response> {
//     const {
//       data: { email, password, userName },
//     } = command;

//     const _password = await UserPassword.create({ isHashed: false, password });
//     const _email = UserEmail.create({ email });
//     const _userName = UserName.create({ userName });

//     // TODO: change to combine them, return array
//     if (_email.isFailure) {
//       return left(new EmailAlreadyExistsError(_email.getErrorValue()));
//     }
//     if (_password.isFailure) {
//       return left(new EmailAlreadyExistsError(_password.getErrorValue()));
//     }
//     if (_userName.isFailure) {
//       return left(new EmailAlreadyExistsError(_userName.getErrorValue()));
//     }

//     const _user = User.create({
//       email: _email.getValue(),
//       password: _password.getValue(),
//       userName: _userName.getValue(),
//     });

//     if (_user.isFailure) {
//       return left(new EmailAlreadyExistsError(_user.getErrorValue()));
//     }

//     const events = createEventType("UserCreated", { userID: generateID() });

//     await this.eventStore.save<>(
//       (`user/${userId}`, events, { expectedVersion: null })
//     );

//     return;
//   }
// }
