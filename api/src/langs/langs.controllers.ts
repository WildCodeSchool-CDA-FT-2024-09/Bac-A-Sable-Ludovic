import express, { Response, Request } from "express";
// import Joi from "joi";

// import langs from "../../data/langs.json";
// import type { Lang } from "./lang.type";

import { Lang } from "./lang.entities";

// let myLang: Array<Lang> = langs;

const langControllers = express.Router();

// const schema = Joi.object({
//   id: Joi.number().required(),
//   label: Joi.string().required(),
// });

// const validateLang = (req: Request, res: Response, next: NextFunction) => {
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

// langControllers.get("/", (req: Request, res: Response) => {
//   const { id, label } = req.query;

//   let result = myLang;

//   if (id !== undefined) {
//     result = result.filter((lang: Lang) => lang.id === parseInt(id as string));
//   }

//   if (label !== undefined) {
//     result = result.filter((lang: Lang) =>
//       lang.label.toLowerCase().includes((label as string).toLowerCase())
//     );
//   }
//   res.status(200).json(result);
// });

langControllers.get("/", async (_: any, res: Response) => {
  try {
    const lang = await Lang.find();
    res.status(200).json(lang);
  } catch (error) {
    res.sendStatus(500);
  }
});

// langControllers.get("/:id", (req: Request, res: Response) => {
//   const lang = langs.find((rep) => rep.id === Number(req.params.id)) as Lang;

//   if (lang) {
//     res.status(200).json(lang);
//   } else {
//     res.sendStatus(404);
//   }
// });

// langControllers.post("/", validateLang, (req: Request, res: Response) => {
//   console.log("Hello POST");
//   myLang.push(req.body);
//   res.status(201).json(req.body);
// });

langControllers.post("/", async (req: Request, res: Response) => {
  try {
    const lang = new Lang();
    lang.label = req.body.label;

    await lang.save();
    res.status(201).json(lang);

  } catch (error) {
    res.sendStatus(500)
  }
});

// langControllers.put("/:id", (req: Request, res: Response) => {
//   const { id } = req.params;
//   const index = myLang.findIndex((lang: Lang) => lang.id === parseInt(id));

//   if (index === -1) {
//     return res.status(404).json({ message: "Repo non trouvé" });
//   }

//   myLang[index] = { ...myLang[index], ...req.body };
//   return res.status(200).json(myLang[index]);
// });

// langControllers.delete("/:id", (req: Request, res: Response) => {
//   myLang = myLang.filter((lang: Lang) => lang.id !== parseInt(req.params.id));
//   res.sendStatus(204);
// });

export default langControllers;
