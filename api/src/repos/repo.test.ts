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
      langs {
        id
        label
      }
    }
  }
`;

describe("Repo resolvers", () => {
  let schema: GraphQLSchema;

  // Initialisation du schéma avant tous les tests
  beforeAll(async () => {
    schema = await getSchema();
  });

  it("should return all repos with valid structure", async () => {
    // Exécution de la requête GraphQL
    const result = await graphql({
      schema: schema,
      source: print(GET_REPOS),
    });

    // Vérification qu'il n'y a pas d'erreurs dans la réponse
    if (result.errors) {
      console.error("GraphQL errors:", result.errors);
      fail("GraphQL query returned errors");
    }

    // Vérification que les données sont définies
    const fullrepos = result.data?.fullrepos;
    expect(fullrepos).toBeDefined();

    // Vérification que `fullrepos` est un tableau
    expect(fullrepos).toEqual(expect.any(Array));

    // Vérification de la structure des objets dans le tableau
    expect(fullrepos).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
          url: expect.any(String),
          isFavorite: expect.any(Boolean),
          langs: expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              label: expect.any(String),
            }),
          ]),
        }),
      ])
    );
  });
});
