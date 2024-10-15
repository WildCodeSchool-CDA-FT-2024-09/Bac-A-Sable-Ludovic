import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Lang = {
  __typename?: 'Lang';
  id: Scalars['Float']['output'];
  label: Scalars['String']['output'];
  repos: Array<Repo>;
};

export type LangInput = {
  id: Scalars['Float']['input'];
  label: Scalars['String']['input'];
};

export type LightRepo = {
  __typename?: 'LightRepo';
  id: Scalars['ID']['output'];
  isFavorite: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createNewLang: Lang;
  createNewRepo: Repo;
  createNewStatus: Status;
  deleteLang: Lang;
  deleteRepo: Repo;
  deleteStatus: Status;
  updateLang: Lang;
  updateRepo: Repo;
  updateStatus: Status;
};


export type MutationCreateNewLangArgs = {
  data: LangInput;
};


export type MutationCreateNewRepoArgs = {
  data: RepoInput;
};


export type MutationCreateNewStatusArgs = {
  data: StatusInput;
};


export type MutationDeleteLangArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteRepoArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteStatusArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUpdateLangArgs = {
  data: LangInput;
  id: Scalars['Int']['input'];
};


export type MutationUpdateRepoArgs = {
  data: RepoInput;
  id: Scalars['String']['input'];
};


export type MutationUpdateStatusArgs = {
  data: StatusInput;
  id: Scalars['Int']['input'];
};

export type Query = {
  __typename?: 'Query';
  fulllangs: Array<Lang>;
  fullrepos: Array<Repo>;
  fullstatus: Array<Status>;
  lightrepos: Array<LightRepo>;
};

export type Repo = {
  __typename?: 'Repo';
  id: Scalars['ID']['output'];
  isFavorite: Scalars['Boolean']['output'];
  langs: Array<Lang>;
  name: Scalars['String']['output'];
  status: Status;
  url: Scalars['String']['output'];
};

export type RepoInput = {
  id: Scalars['String']['input'];
  isPrivate: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type Status = {
  __typename?: 'Status';
  id: Scalars['Float']['output'];
  label: Scalars['String']['output'];
  repos: Array<Repo>;
};

export type StatusInput = {
  id: Scalars['Float']['input'];
  label: Scalars['String']['input'];
};

export type FullReposQueryVariables = Exact<{ [key: string]: never; }>;


export type FullReposQuery = { __typename?: 'Query', fullrepos: Array<{ __typename?: 'Repo', id: string, name: string, url: string, isFavorite: boolean, langs: Array<{ __typename?: 'Lang', id: number, label: string }> }> };

export type FullLangsQueryVariables = Exact<{ [key: string]: never; }>;


export type FullLangsQuery = { __typename?: 'Query', fulllangs: Array<{ __typename?: 'Lang', id: number, label: string }> };


export const FullReposDocument = gql`
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

/**
 * __useFullReposQuery__
 *
 * To run a query within a React component, call `useFullReposQuery` and pass it any options that fit your needs.
 * When your component renders, `useFullReposQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFullReposQuery({
 *   variables: {
 *   },
 * });
 */
export function useFullReposQuery(baseOptions?: Apollo.QueryHookOptions<FullReposQuery, FullReposQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FullReposQuery, FullReposQueryVariables>(FullReposDocument, options);
      }
export function useFullReposLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FullReposQuery, FullReposQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FullReposQuery, FullReposQueryVariables>(FullReposDocument, options);
        }
export function useFullReposSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FullReposQuery, FullReposQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FullReposQuery, FullReposQueryVariables>(FullReposDocument, options);
        }
export type FullReposQueryHookResult = ReturnType<typeof useFullReposQuery>;
export type FullReposLazyQueryHookResult = ReturnType<typeof useFullReposLazyQuery>;
export type FullReposSuspenseQueryHookResult = ReturnType<typeof useFullReposSuspenseQuery>;
export type FullReposQueryResult = Apollo.QueryResult<FullReposQuery, FullReposQueryVariables>;
export const FullLangsDocument = gql`
    query FullLangs {
  fulllangs {
    id
    label
  }
}
    `;

/**
 * __useFullLangsQuery__
 *
 * To run a query within a React component, call `useFullLangsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFullLangsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFullLangsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFullLangsQuery(baseOptions?: Apollo.QueryHookOptions<FullLangsQuery, FullLangsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FullLangsQuery, FullLangsQueryVariables>(FullLangsDocument, options);
      }
export function useFullLangsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FullLangsQuery, FullLangsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FullLangsQuery, FullLangsQueryVariables>(FullLangsDocument, options);
        }
export function useFullLangsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FullLangsQuery, FullLangsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FullLangsQuery, FullLangsQueryVariables>(FullLangsDocument, options);
        }
export type FullLangsQueryHookResult = ReturnType<typeof useFullLangsQuery>;
export type FullLangsLazyQueryHookResult = ReturnType<typeof useFullLangsLazyQuery>;
export type FullLangsSuspenseQueryHookResult = ReturnType<typeof useFullLangsSuspenseQuery>;
export type FullLangsQueryResult = Apollo.QueryResult<FullLangsQuery, FullLangsQueryVariables>;