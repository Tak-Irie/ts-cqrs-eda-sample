// import verify from "../../../shared/domain/verification/verify";
// import {
//   Event,
//   UserCreatedEvent,
//   UsernameChangedEvent,
//   UserPasswordChangedEvent,
//   UserEmailAddressChangedEvent,
//   UserRoleChangedEvent,
// } from "../../domain/events";

// import EmailAddress from "./email-address.js.js";
// import Role from "./role.js.js";

// type State = { id: string; password?: string };

// type EmailAvailability = {
//   isEmailAvailable: (emailAddress: EmailAddress) => boolean;
// };

// type UserCreationArguments = {
//   id: string;
//   username: string;
//   emailAddress: EmailAddress;
//   password: string;
//   role: Role;
//   emailAvailability: EmailAvailability;
// };

// const applyUserEvents = (state: State, events: Event[]) =>
//   events.reduce(applyEvent, state);

// const applyEvent = (state: State, event: Event) => {
//   if (
//     event.type == UserCreatedEvent.type ||
//     event.type == UserPasswordChangedEvent.type
//   )
//     return { ...state, password: event.data.password };
//   return { ...state };
// };

// const createUser = (data: UserCreationArguments) => {
//   const { id, username, emailAddress, password, role, emailAvailability } =
//     data;
//   verify("valid id", id.length > 0);
//   verify("valid username", username.length > 0);
//   verify("unused e-mail", emailAvailability.isEmailAvailable(emailAddress));
//   verify("valid password", password.length > 0);
//   return [
//     new UserCreatedEvent({
//       userId: id,
//       username,
//       emailAddress: emailAddress.value,
//       password,
//       role: role.name,
//     }),
//   ];
// };

// const updateUsername = (state: State, username: string) => {
//   verify("valid username", username.length > 0);
//   return [new UsernameChangedEvent({ userId: state.id, username })];
// };

// const updateEmailAddress = (
//   state: State,
//   emailAddress: EmailAddress,
//   emailAvailability: EmailAvailability
// ) => {
//   verify("unused e-mail", emailAvailability.isEmailAvailable(emailAddress));
//   return [
//     new UserEmailAddressChangedEvent({
//       userId: state.id,
//       emailAddress: emailAddress.value,
//     }),
//   ];
// };

// const updatePassword = (state: State, password: string) => {
//   verify("valid password", password.length > 0);
//   return [new UserPasswordChangedEvent({ userId: state.id, password })];
// };

// const updateRole = (state: State, role: Role) => [
//   new UserRoleChangedEvent({ userId: state.id, role: role.name }),
// ];

// export {
//   applyUserEvents,
//   createUser,
//   updateEmailAddress,
//   updateUsername,
//   updatePassword,
//   updateRole,
// };
