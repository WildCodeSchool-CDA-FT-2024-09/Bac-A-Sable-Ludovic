import "./RepoDard.css";

import type { Repo } from "../types/RepoType";
import { Link } from "react-router-dom";

function RepoDard({ name, url, id, isFavorite }: Repo) {
  return (
    <div className="repo">
      <Link to={url}>
        <h2 className="titleRepoGit">{name}</h2>
      </Link>
      <p>{isFavorite ? "Favory" : "Non Favory"}</p>
      <Link to={`/detail/${id}`} className="detail">
        Plus d'info
      </Link>
    </div>
  );
}

export default RepoDard;
