// import express from "express";
// import router from "./router";
// import * as dotenv from "dotenv";
// import cors from "cors";

// dotenv.config();

// const { PORT } = process.env;

// import { dataSource } from "./db/client";
// import "reflect-metadata";

// const app = express();

// // app.get ('/maroute', fonction de callback)

// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL as string,
//   })
// );

// app.use(express.json());

// app.use("/api", router);

// app.listen(PORT, async () => {
//   await dataSource.initialize();
//   console.log(`Serveur is listenning on http://localhost:${PORT}`);
// });

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import repos from "../data/repos.json";

const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Repo" type defines the queryable fields for every repo in our data source.
  type Repo {
    id: String
    name: String
    url: String
    isFavorite: Boolean
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    repos: [Repo]
  }
`;

const resolvers = {
  Query: {
    repos: () => repos,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

(async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`Server ready at ${url}`);
})();
