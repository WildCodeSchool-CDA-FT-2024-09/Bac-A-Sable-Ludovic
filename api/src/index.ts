import express from "express";
import router from "./router";
const app = express();

// app.get ('/maroute', fonction de callback)

app.use(express.json());

app.use("/api", router);

app.listen(3312, () => {
  console.log("Serveur is listening on http://localhost:3312");
});
