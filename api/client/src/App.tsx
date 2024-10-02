import "./App.css";
import type { Repo, Lang } from "./types/RepoType";
import data from "./assets/data.json";
import dataLang from "./assets/dataLang.json";
import RepoDard from "./components/RepoDard";
import Langs from "./components/Langs"

function App() {
  return (
    <main>
      <h1>Mes repo GitHub</h1>
      <div className="langContainer">
      <h2 className="NoFilter">Aucun filtre</h2>
      {dataLang.map((lang: Lang) => (
        <Langs key={lang.label} lang={lang.label} />
      ))}
      </div>
      {data.map((repo: Repo) => (
        <RepoDard key={repo.name} name={repo.name} url={repo.url} />
      ))}
    </main>
  );
}

export default App;
