import getSchema from "../schema";
import { graphql, GraphQLSchema, print } from "graphql";
import gql from "graphql-tag";

const GET_REPOS = gql`
  query FullRepos {
    fullrepos {
      id
      name
      url
      isFavorite
    }
  }
`;

describe("Repo resolvers", () => {
  let schema: GraphQLSchema;

  beforeAll(async () => {
    schema = await getSchema();
  });

  it("get all repos", async () => {
    const result = (await graphql({
      schema: schema,
      source: print(GET_REPOS),
    })) as { data: { fullrepos: Array<unknown> } };
    console.log(result);

    // Verification que la réponse est au format tableau
    expect(result.data.fullrepos).toEqual(expect.any(Array));

    // Verification que chaque objet du tableau contient l'ensemble des keys
    expect(result.data.fullrepos).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
          url: expect.any(String),
          isFavorite: expect.any(Boolean),
        }),
      ])
    );
  });
});
