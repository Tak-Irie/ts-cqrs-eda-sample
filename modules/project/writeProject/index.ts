import { EventBus } from "../../shared/infrastructure/EventBus";
import { EventStoreDB } from "../../shared/infrastructure/implementation/EventStoreDB";
import { RabbitMQBus } from "../../shared/infrastructure/implementation/RabbitMQBus";
import { _EventStoreDB } from "../../shared/infrastructure/implementation/_EventStoreDB";
import {
  EVENT_STORE_URI,
  MESSAGE_BROKER_URI,
} from "../../shared/util/Constants";
import { ProjectEvents } from "../domain/ProjectEvents";
import { ProjectCommandHandler } from "./controller/ProjectCommandHandler";

const eventStore = new _EventStoreDB<ProjectEvents>(EVENT_STORE_URI);
const eventBus = new EventBus(new RabbitMQBus(MESSAGE_BROKER_URI, "project"));

const commandHandlers = new ProjectCommandHandler({ eventStore });
// new ProjectDomainEventHandlers({ eventStore, eventBus }).activate();
