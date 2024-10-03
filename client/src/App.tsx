import "./App.css";
import { useEffect, useState } from "react";
import connexion from "./services/connexion";
import type { Repo, Lang } from "./types/RepoType";
// import data from "./assets/data.json";
// import dataLang from "./assets/dataLang.json";
import RepoDard from "./components/RepoDard";
import Langs from "./components/Langs";

function App() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [langs, setLangs] = useState<Lang[]>([]);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const repos = await connexion.get<Repo[]>("/api/repos");
        setRepos(repos.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchLangs = async () => {
      try {
        const langs = await connexion.get<Lang[]>("/api/langs");
        setLangs(langs.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRepos();
    fetchLangs();
  }, []);

  return (
    <main>
      <h1 className="titleRepo">Mes repo GitHub</h1>
      <ul className="langContainer">
        <li className="NoFilter">Aucun filtre</li>
        {langs.map((lang: Lang) => (
          <Langs key={lang.label} lang={lang.label} />
        ))}
      </ul>
      <div className="repoContainer">
        {repos.map((repo: Repo) => (
          <RepoDard key={repo.name} name={repo.name} url={repo.url} />
        ))}
      </div>
    </main>
  );
}

export default App;
