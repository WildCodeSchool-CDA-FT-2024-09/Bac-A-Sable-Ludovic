import express, { Response, Request, NextFunction } from "express";
import Joi from "joi";

import repos from "../../data/repos.json";
import type { Repo } from "./repo.type";

let myRepos: Array<Repo> = repos;

const repoControllers = express.Router();

const schema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  url: Joi.string().required(),
  isPrivate: Joi.number().min(1).max(2).required(),
});

const validateRepo = (req: Request, res: Response, next: NextFunction) => {
  console.log("toto");
  const { error } = schema.validate(req.body);
  console.log(error);

  if (error) {
    console.log("error");
    res
      .status(422)
      .json({ message: "Mauvaises données ou mauvais format de données" });
  } else {
    console.log("Un enregistrement a été créé");
    next();
  }
};

repoControllers.get("/", (req: Request, res: Response) => {
  const { status, name } = req.query;

  let result = myRepos;

  if (status !== undefined) {
    result = result.filter((repo: Repo) => repo.isPrivate === +status);
  }

  if (name !== undefined) {
    result = result.filter((repo: Repo) =>
      repo.name.toLowerCase().includes((name as string).toLowerCase())
    );
  }
  res.status(200).json(result);
});

repoControllers.get("/:id", (req: Request, res: Response) => {
  const repo = myRepos.find((rep) => rep.id === req.params.id) as Repo;

  if (repo) {
    res.status(200).json(repo);
  } else {
    res.sendStatus(404);
  }
});

repoControllers.post("/", validateRepo, (req: Request, res: Response) => {
  console.log("Hello POST");
  myRepos.push(req.body);
  res.status(201).json(req.body);
}); // http://localhost:3001/api/repos/ <=> http://localhost:3001/users/:id/repos/

repoControllers.put("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const index = myRepos.findIndex((repo: Repo) => repo.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Repo non trouvé" });
  }

  myRepos[index] = { ...myRepos[index], ...req.body };
  return res.status(200).json(myRepos[index]);
});

repoControllers.delete("/:id", (req: Request, res: Response) => {
  myRepos = myRepos.filter((repo: Repo) => repo.id !== req.params.id);
  res.sendStatus(204);
});

export default repoControllers;
