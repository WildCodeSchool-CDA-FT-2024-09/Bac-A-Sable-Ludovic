import { gql } from '@apollo/client';


export const GET_REPOS = gql`
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