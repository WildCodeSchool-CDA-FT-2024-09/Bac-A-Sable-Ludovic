//import des entités Repo et LightRepo de repo.entities.ts
import { Repo, LightRepo } from "./repo.entities";

//import des décorateurs et classes Arg, Field, InputType, Mutation, Query et Resolver de type-graphql
//utilisés pour définir des arguments, des champs, des types d'entrée, des mutations, des requêtes et des résolveurs
//dans un shcéma GraphQL.
import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";

import { Status } from "../status/status.entities";

/**
 * type Repo {
 *  id: string
 *  ...
 * }
 */
@InputType()
class RepoInput implements Partial<Repo> {
  @Field()
  id: string;

  @Field()
  url: string;

  @Field()
  name: string;

  @Field()
  isPrivate: number;
}

@Resolver(Repo)
export default class RepoResolver {
  // Methode GET pour tous les repos
  @Query(() => [Repo])
  async fullrepos() {
    console.log("fullrepos");
    const repos = await Repo.find({
      relations: {
        status: true,
        langs: true,
      },
    });
    console.info(repos);
    return repos;
  }

  @Query(() => [LightRepo])
  async lightrepos() {
    const repos = await Repo.find();
    console.info(repos);
    return repos;
  }

  @Mutation(() => Repo)
  async createNewRepo(@Arg("data") newRepo: RepoInput) {
    //const newRepo: RepoInput = req.body.data
    // fonction de validation
    console.info(newRepo);

    const repo = new Repo();
    repo.id = newRepo.id;
    repo.name = newRepo.name;
    repo.url = newRepo.url;

    const status = await Status.findOneOrFail({
      where: { id: +newRepo.isPrivate },
    });
    repo.status = status;

    await repo.save();
    console.log("repo", repo);
    const myRepo = await Repo.findOneOrFail({
      where: { id: newRepo.id },
      relations: {
        langs: true,
        status: true,
      },
    });
    console.log("myRepo", myRepo);
    return myRepo;
  }
  @Mutation(() => Repo)
  async deleteRepo(@Arg("id") id: string) {
    console.log("ID reçu pour suppression:", id);
    const repo = await Repo.findOne({ where: { id } });
    if (!repo) {
      console.error(`Repo avec ID ${id} non trouvée`);

      throw new Error("Repo non trouvée");
    }

    await repo.remove();
    return repo;
  }
}
