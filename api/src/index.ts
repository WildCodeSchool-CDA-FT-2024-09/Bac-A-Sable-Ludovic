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

//Import ApolloServer du package @apollo/server pour créerr un serveur Apollo et fonction
//startStandaloneServer pour démarrer le serveur Apollo
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
//Import buildSchema du package type-graphql pour construire le schéma GraphQL
//en utilisant des classes et des décorateurs TypeScript
import { buildSchema } from "type-graphql";
//Import de la base de données
import { dataSource } from "./db/client";
//Import de reflect-metadata qui active les décorateurs TypeScript (essentiel pour type-graphql et typeorm)
import "reflect-metadata";
//Import des resolvers de repos
import RepoResolvers from "./repos/repo.resolvers";
import LangResolver from "./langs/lang.resolvers";
import StatusResolver from "./status/status.resolvers";

// import repos from "../data/repos.json";

// const typeDefs = `#graphql
//   # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

//   # This "Repo" type defines the queryable fields for every repo in our data source.
//   type Repo {
//     id: String
//     name: String
//     url: String
//     isFavorite: Boolean
//   }

//   # The "Query" type is special: it lists all of the available queries that
//   # clients can execute, along with the return type for each. In this
//   # case, the "books" query returns an array of zero or more Books (defined above).
//   type Query {
//     repos: [Repo]
//   }
// `;

// const resolvers = {
//   Query: {
//     repos: () => repos,
//   },
// };

// Initialise une connexion à la base de données.
// Genère un schéma GraphQL à partir des resolvers repo en utilisant buildSchema.
// Crée un serveur Apollo avec le schéma généré.
// Démarre le serveur Apollo sur le port 4000.

(async () => {
  await dataSource.initialize();
  const schema = await buildSchema({
    resolvers: [RepoResolvers, LangResolver, StatusResolver],
  });

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`Server ready at ${url}`);
})();
