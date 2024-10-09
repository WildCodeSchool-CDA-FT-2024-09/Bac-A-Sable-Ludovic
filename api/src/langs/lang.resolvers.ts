import { Lang } from "../langs/lang.entities";
import { Query, Resolver } from "type-graphql";

// @InputType()
// class LangInput implements Partial<Lang> {
//   @Field()
//   id: number;

//   @Field()
//   label: string;
// }

@Resolver(Lang)
export default class LangResolver {
  // Methode GET pour tous les repos
  @Query(() => [Lang])
  async fulllangs() {
    const langs = await Lang.find();
    console.info(langs);
    return langs;
  }
}
