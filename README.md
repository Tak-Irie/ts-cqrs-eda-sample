# ts-cqrs-eda-sample

This is sample code which adopt DDD architecture written by TS.

## How to run

WORK IN PROGRESS

## technologies

serverSide: Express(Node.js)<br/>
frontSide: Next.js(React)<br/>
storage: EventStoreDB, Redis<br/>
messageBroker: RabbitMQ<br/>
API: Apollo(GraphQL)<br/>
others: yarnWorkspace, DockerCompose<br/>

## Notice

This application is written to learn DDD.
Not suits for products.

The modules are integrated into an express server.
If you want to separate them and construct MicroService,
You can implement HTTP/gRPC server within each module.
And then you can convert express to a proxy or remove.

## Special Thanks

I have learned much about DDD in their books.

[Khalil Stemmler](https://khalilstemmler.com/) - [solid](https://solidbook.io/)<br/>
[Alex Lawrence](https://www.alex-lawrence.com/) - [Implementing DDD, CQRS and Event Sourcing](https://www.alex-lawrence.com/book/)

