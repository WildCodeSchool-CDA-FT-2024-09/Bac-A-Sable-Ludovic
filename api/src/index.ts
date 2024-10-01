import express from "express";
import router from "./router";
import { dataSource } from "./db/client";
import "reflect-metadata";

const app = express();

// app.get ('/maroute', fonction de callback)

app.use(express.json());

app.use("/api", router);

app.listen(3312, async () => {
  try {
    await dataSource.initialize();
    console.log("Serveur is listening on http://localhost:3312");
  } catch (error) {
    console.error("Erreur lors de l'initailisation de la base de données");
  }
});
