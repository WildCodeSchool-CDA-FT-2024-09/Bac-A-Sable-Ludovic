import express, { Response, Request } from "express";
// import { validate } from "class-validator";

// import repos from "../../data/repos.json";
// import type { Repo } from "./repo.type";

import { Repo } from "./repo.entities";
import { Status } from "../status/status.entities";
import { Lang } from "../langs/lang.entities";
import { In } from "typeorm";

// let myRepos: Array<Repo> = repos;

const repoControllers = express.Router();

// const schema = Joi.object({
//   id: Joi.string().required(),
//   name: Joi.string().required(),
//   url: Joi.string().required(),
//   isPrivate: Joi.number().min(1).max(2).required(),
// });

// const validateRepo = (req: Request, res: Response, next: NextFunction) => {
//   console.log("toto");
//   const { error } = schema.validate(req.body);
//   console.log(error);

//   if (error) {
//     console.log("error");
//     res
//       .status(422)
//       .json({ message: "Mauvaises données ou mauvais format de données" });
//   } else {
//     console.log("Un enregistrement a été créé");
//     next();
//   }
// };

repoControllers.get("/", async (req: Request, res: Response) => {
  try {
    const lang = typeof req.query.lang === "string" ? req.query.lang : null;
    const status =
      typeof req.query.status === "string"
        ? parseInt(req.query.status, 10)
        : null;

    const queryOptions: any = {
      relations: {
        status: true,
        langs: true,
      },
      where: {},
    };

    if (lang) {
      queryOptions.where.langs = { label: lang };
    }

    if (status !== null) {
      queryOptions.where.status = { id: status };
    }
    const repos = await Repo.find(queryOptions);

    res.status(200).json(repos);
  } catch (error) {
    res.sendStatus(500);
  }
});

repoControllers.get("/:id", async (req: Request, res: Response) => {
  try {
    const repo = await Repo.find({
      where: { id: req.params.id },
      relations: { status: true, langs: true },
    });

    if (repo) {
      res.status(200).json(repo);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

repoControllers.post("/", async (req: Request, res: Response) => {
  try {
    const repo = new Repo();
    repo.id = req.body.id;
    repo.name = req.body.name;
    repo.url = req.body.url;

    const status = await Status.findOneOrFail({
      where: { id: req.body.isPrivate },
    });
    repo.status = status;

    const langs = await Lang.find({
      where: { id: In(req.body.langs.map((l: number) => l)) },
    });
    repo.langs = langs;

    await repo.save();
    res.status(201).json(repo);
  } catch (error) {
    res.sendStatus(500);
  }
});

repoControllers.put("/:id", async (req: Request, res: Response) => {
  try {
    const repo = await Repo.findOneBy({ id: req.params.id });

    if (!repo) {
      return res.sendStatus(404);
    }

    repo.name = req.body.name ?? repo.name;
    repo.url = req.body.url ?? repo.url;
    repo.status = req.body.status ?? repo.status;

    await repo.save();
    return res.status(200).json(repo);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
});

// repoControllers.delete("/:id", (req: Request, res: Response) => {
//   myRepos = myRepos.filter((repo: Repo) => repo.id !== req.params.id);
//   res.sendStatus(204);
// });

export default repoControllers;
