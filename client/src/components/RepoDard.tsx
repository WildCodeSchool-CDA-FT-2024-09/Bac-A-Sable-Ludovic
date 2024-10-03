import "./RepoDard.css";

import type { Repo } from "../types/RepoType";

function RepoDard({ name, url }: Repo) {
  return (
    <div className="repo">
      <h2 className="titleRepo">{name}</h2>
      <h3 className="urlRepo">{url}</h3>
    </div>
  );
}

export default RepoDard;
