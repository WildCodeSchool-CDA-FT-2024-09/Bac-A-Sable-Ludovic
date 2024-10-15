// import du fichier App.css
import "./App.css";

// import { useEffect, useState } from "react";
// import connexion from "./services/connexion";

// import des types Repo et Lang
import type { Repo, Lang } from "./types/RepoType";
// import data from "./assets/data.json";
// import dataLang from "./assets/dataLang.json";

// import des composants RepoDard et Langs
import RepoDard from "./components/RepoDard";
import Langs from "./components/Langs";

// import du hook useQuery et de la fonction gql (gql permet de définir des requêtes ou des mutations GraphQL)
import { useQuery, gql } from "@apollo/client";

import { useState } from "react";

import { useFullReposQuery } from "./generated/graphql-types";

// Requête GraphQL pour récupérer les repos avec leur id, name, url et isFavorite
// const GET_REPOS = gql`
//   query FullRepos {
//     fullrepos {
//       id
//       name
//       url
//       isFavorite
//       langs {
//         id
//         label
//       }
//     }
//   }
// `;

// Requête GraphQL pour récupérer les langues avec leur label
const GET_LANGS = gql`
  query FullLangs {
    fulllangs {
      id
      label
    }
  }
`;

function App() {
  const [selectedLang, setSelectedLang] = useState<string | null>(null);

  // Utilisation du hook useQuery pour récupérer les données de la requête GET_REPOS
  const {
    loading: loadingRepos,
    error: errorRepos,
    data: dataRepos,
    refetch: refetchRepos,
  } = useFullReposQuery();

  // Utilisation du hook useQuery pour récupérer les données de la requête GET_LANGS
  const {
    loading: loadingLangs,
    error: errorLangs,
    data: dataLangs,
    refetch: refetchLangs,
  } = useQuery(GET_LANGS);

  // const [repos, setRepos] = useState<Repo[]>([]);
  // const [langs, setLangs] = useState<Lang[]>([]);

  // useEffect(() => {
  //   const fetchRepos = async () => {
  //     try {
  //       const query = selectedLang ? `?lang=${selectedLang}` : "";
  //       const repos = await connexion.get<Repo[]>(`/api/repos${query}`);
  //       setRepos(repos.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   const fetchLangs = async () => {
  //     try {
  //       const langs = await connexion.get<Lang[]>("/api/langs");
  //       setLangs(langs.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchRepos();
  //   fetchLangs();
  // }, [selectedLang]);

  // const handleLangChange = (lang: string | null) => {
  //   setSelectedLang(lang);
  // };
  if (loadingRepos || loadingLangs) return <h1>Loading...</h1>;
  if (errorRepos || errorLangs) return <p>Error</p>;

  // code pour filtrer les repos en fonction de la langue sélectionnée.
  // Si une langue est sélectionnée, on filtre les repos pour ne garder que ceux qui ont cette langue.
  // Sinon, on garde tous les repos.
  const filteredRepos = selectedLang
    ? dataRepos?.fullrepos.filter((repo: Repo) =>
        repo.langs?.some((lang: Lang) => lang.label === selectedLang)
      )
    : dataRepos?.fullrepos;

  return (
    <main>
      <h1 className="titleRepo">Mes repo GitHub</h1>

      <ul className="langContainer">
        <li className="NoFilter" onClick={() => setSelectedLang(null)}>
          Aucun filtre
        </li>
        {dataLangs.fulllangs.map((lang: Lang) => (
          <Langs
            key={lang.label}
            lang={lang.label}
            onClick={() => setSelectedLang(lang.label)}
          />
        ))}
      </ul>
      <div className="repoContainer">
        {filteredRepos?.map((repo: Repo) => (
          <RepoDard
            name={repo.name}
            url={repo.url}
            id={repo.id}
            isFavorite={repo.isFavorite}
          />
        ))}
      </div>
      <button
        onClick={() => {
          refetchRepos();
          refetchLangs();
        }}
      >
        Refetch
      </button>
    </main>
  );
}

export default App;
