import { readFileSync } from "fs";
import { resolve } from "path";
import { makeExecutableSchema } from "@graphql-tools/schema";

// import { userResolver } from "./userResolver";
import { taskBoardResolver } from "./taskBoardResolver";

const typeDefs = readFileSync(
  resolve(__dirname, "./generated/schema.graphql")
).toString("utf-8");

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: [taskBoardResolver],
});

export { schema };
