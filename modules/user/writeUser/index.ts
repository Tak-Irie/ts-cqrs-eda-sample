// import { EventStoreDB } from "../../shared/infrastructure/implementation/EventStoreDB";
// import { EmailRegistry } from "./domain";
// import { CreateUserUsecase } from "./usecase/CreateUser/CreateUserUsecase";
// import EmailRegistryProjection from "./usecase/EmailRegistryProjection";

// const uri =
//   "esdb://127.0.0.1:2113?tls=false&keepAliveTimeout=10000&keepAliveInterval=10000";

// const eventStore = new EventStoreDB(uri);
// const emailRegistry = new EmailRegistry();

// new EmailRegistryProjection(emailRegistry, eventStore).activate();

// export const createUserUsecase = new CreateUserUsecase(
//   eventStore,
//   emailRegistry
// );
