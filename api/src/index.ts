import * as dotenv from "dotenv";
dotenv.config();

const { AUTH_SECRET_KEY, PORT } = process.env;
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import setCookie from "set-cookie-parser";
import * as jwt from "jsonwebtoken";

import getSchema from "./schema";

import { dataSource } from "./db/client";
import "reflect-metadata";


(async () => {
  await dataSource.initialize();
  console.log(`Database is connected`);
  const schema = await getSchema();

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: Number(PORT) },
    context: async ({ req, res }) => {
      if (!req.headers.cookie) return { res };

      const { cdatokenexample } = setCookie.parse(
        req.headers.cookie as string,
        {
          map: true,
        }
      );
      if (!cdatokenexample) return { res };

      const payload = jwt.verify(
        cdatokenexample.value,
        AUTH_SECRET_KEY as string
      );
      if (!payload) return { res };
      return { res, payload };
    },
  });

  console.info(`Docker compose is watching`);
  console.log(`Port used: ${url}`);
})();
