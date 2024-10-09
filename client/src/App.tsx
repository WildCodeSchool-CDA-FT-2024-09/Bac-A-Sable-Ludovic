import "./App.css";
// import { useEffect, useState } from "react";
// import connexion from "./services/connexion";
import type { Repo } from "./types/RepoType";
// import data from "./assets/data.json";
// import dataLang from "./assets/dataLang.json";
import RepoDard from "./components/RepoDard";
// import Langs from "./components/Langs";
import { useQuery, gql } from "@apollo/client";

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

function App() {
  const { loading, error, data, refetch } = useQuery(GET_REPOS);

  // const [repos, setRepos] = useState<Repo[]>([]);
  // const [langs, setLangs] = useState<Lang[]>([]);
  // const [selectedLang, setSelectedLang] = useState<string | null>(null);

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
  if (loading) return <h1>Loading...</h1>;
  if (error) return <p>Error</p>;

  return (
    <main>
      <h1 className="titleRepo">Mes repo GitHub</h1>

      {/* <ul className="langContainer">
        <li className="NoFilter">Aucun filtre</li>
        {langs.map((lang: Lang) => (
          <Langs
            key={lang.label}
            lang={lang.label}
            onClick={() => handleLangChange(lang.label)}
          />
        ))}
      </ul> */}
      <div className="repoContainer">
        {data.fullrepos.map((repo: Repo) => (
          <RepoDard
            name={repo.name}
            url={repo.url}
            id={repo.id}
            isFavorite={repo.isFavorite}
          />
        ))}
      </div>
      <button onClick={() => refetch()}>Refetch</button>
    </main>
  );
}

export default App;
