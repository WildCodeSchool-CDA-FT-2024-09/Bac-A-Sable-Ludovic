import { Arg, Ctx, Query, Resolver } from "type-graphql";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();
const { AUTH_SECRET_KEY } = process.env;

const me = {
  email: "test@test.com",
  password: "argon2hash",
};
console.log(me);

@Resolver()
export default class UserResolver {
  // methode pour se connecter
  @Query(() => Boolean)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx()
    context: { res: { setHeader: (name: string, value: string) => void } }
  ) {
    console.info(email, password);

    // première étape, à partir de l'émail, vérifier si j'ai un user ... user.find..
    if (me.email === email) {
      // deuxième étape, vérifier le hash du mot de passe
      if (me.password === password) {
        // troisième étape, générer un token
        const token = jwt.sign(
          { email: me.email, name: "Ludovic" },
          AUTH_SECRET_KEY as string
        );
        // quatrième étape, renvoyer le token
        context.res.setHeader(
          "Set-Cookie",
          `cdatokenexample=${token}; HttpOnly;SameSite=Strict;expires=${new Date(
            new Date().getTime() + 1000 * 60 * 60 * 48
          ).toUTCString()}`
        );
        return true;
      }
    }
    return false;
  }
}
