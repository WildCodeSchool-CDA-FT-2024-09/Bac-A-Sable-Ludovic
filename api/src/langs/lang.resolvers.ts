import { Lang } from "../langs/lang.entities";
import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";

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
}
