import express from "express";
import router from "./router";
import * as dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const { PORT } = process.env;

import { dataSource } from "./db/client";
import "reflect-metadata";

const app = express();

// app.get ('/maroute', fonction de callback)

app.use(
  cors({
    origin: process.env.FRONTEND_URL as string,
  })
);

app.use(express.json());

app.use("/api", router);

app.listen(PORT, async () => {
  await dataSource.initialize();
  console.log(`Serveur is listenning on http://localhost:${PORT}`);
});