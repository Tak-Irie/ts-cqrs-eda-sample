import http from "http";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";

import { schema } from "./graphql";
import { CORS_ORIGINS, HTTP_PORT } from "./util/Constants";

const corsOption = {
  origin: CORS_ORIGINS,
  credentials: true,
};

async function startApolloServer() {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({ app, cors: corsOption });

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: HTTP_PORT }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer().catch((err) => {
  console.error("err:", err);
});
