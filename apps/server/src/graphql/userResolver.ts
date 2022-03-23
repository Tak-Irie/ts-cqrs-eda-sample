import { Resolvers, User } from "./generated/resolversTypes";
import { createUserUsecase } from "@ddd-zero/modules";

const tempUser: User = {
  id: "1",
  userName: "hoge",
  email: "temp@email.com",
};

const userResolver: Resolvers = {
  Query: {
    user: (parent, args) => {
      return tempUser;
    },
  },
  Mutation: {
    registerUser: async (_parent, args, _context, _info) => {
      const { email, password, userName } = args;
      const result = await createUserUsecase.execute({
        email,
        password,
        userName,
      });

      if (result.isLeft()) {
        return tempUser;
      }
      result.value.getValue();

      return {
        id: "temp",
        email,
        userName,
      };
    },
  },
};

export { userResolver };
