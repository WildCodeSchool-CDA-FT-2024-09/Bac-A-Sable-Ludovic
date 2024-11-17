import { buildSchema } from "type-graphql";
import RepoResolver from "./repos/repo.resolvers";
import UserResolver from "./user/user.resolver";
import LangResolver from "./langs/lang.resolvers";

const getSchema = async () => {
  return await buildSchema({
    resolvers: [RepoResolver, LangResolver, UserResolver],
    authChecker: ({ context }, roles): boolean => {
      // Si utilisateur admin et Authorized("admin")
      if (roles.length > 0)
        return roles.some((role) => context.cookie.role === role);

      // Si utilisateur connecté et Authorized("user")
      if (context.cookie) return true;

      // Default
      return false;
    },
  });
};

export default getSchema;
