import { EventBus } from "../../shared/infrastructure/EventBus";
import { EventStoreDB } from "../../shared/infrastructure/implementation/EventStoreDB";
import { RabbitMQBus } from "../../shared/infrastructure/implementation/RabbitMQBus";

const esdbUri =
  "esdb://127.0.0.1:2113?tls=false&keepAliveTimeout=10000&keepAliveInterval=10000";
const mqUri = "amqp://rabbitmq";

const eventStore = new EventStoreDB(esdbUri);
const eventBus = new EventBus(new RabbitMQBus(mqUri, "project"));

const domainEventPublisher = new DomainEventPublisher({
  eventStore,
  eventBus,
  publicEventTypes: ["ProjectCreated", "TeamMemberRemovedFromTeam"],
  storageDirectory: "/root/data/domain-event-publisher",
});
domainEventPublisher.activate();

const commandHandlers = new ProjectCommandHandlers({ eventStore });
new ProjectDomainEventHandlers({ eventStore, eventBus }).activate();

const httpInterface = createHttpInterface(
  (message) => commandHandlers.handleCommand(message),
  ["POST"]
);
http.createServer(httpInterface).listen(80);
