import { Lang } from "../langs/lang.entities";
import {
  Arg,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
  Int,
} from "type-graphql";

@InputType()
class LangInput implements Partial<Lang> {
  @Field()
  id: number;

  @Field()
  label: string;
}

@Resolver(Lang)
export default class LangResolver {
  // Methode GET pour tous les repos
  @Query(() => [Lang])
  async fulllangs() {
    const langs = await Lang.find({
      relations: {
        repos: true,
      },
    });
    console.info(langs);
    return langs;
  }

  @Mutation(() => Lang)
  async createNewLang(@Arg("data") newLang: LangInput) {
    const lang = new Lang();
    lang.id = newLang.id;
    lang.label = newLang.label;

    await lang.save();
    console.log("lang", lang);

    const myLang = await Lang.findOneOrFail({
      where: { id: newLang.id },
      relations: {
        repos: true,
      },
    });
    console.log("myLang", myLang);
    return lang;
  }

  @Mutation(() => Lang)
  async updateLang(
    @Arg("id", () => Int) id: number,
    @Arg("data") updatedLang: LangInput
  ) {
    console.log("ID reçu pour la mise à jour :", id);
    const lang = await Lang.findOne({ where: { id } });
    if (!lang) {
      console.error(`Langue avec ID ${id} non trouvée`);

      throw new Error("Langue non trouvée");
    }

    lang.label = updatedLang.label;
    await lang.save();
    console.log(`Langue ${lang.label} mise à jour`);
    return lang;
  }

  @Mutation(() => Lang)
  async deleteLang(@Arg("id", () => Int) id: number) {
    console.log("ID reçu pour suppression:", id);
    const lang = await Lang.findOne({ where: { id } });
    if (!lang) {
      console.error(`Langue avec ID ${id} non trouvée`);

      throw new Error("Langue non trouvée");
    }
    await Lang.remove(lang);
    console.log(`Langue ${lang.label} supprimée`);
    return lang;
  }
}
