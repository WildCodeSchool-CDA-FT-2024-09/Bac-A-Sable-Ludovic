import "./RepoDard.css";

import type { Repo } from "../types/RepoType";
import { Link } from "react-router-dom";

function RepoDard({ name, url, id }: Repo) {
  return (
    <div className="repo">
      <Link to={url}>
        <h2 className="titleRepo">{name}</h2>
      </Link>
      <Link to={`/detail/${id}`}>Plus d'info</Link>
    </div>
  );
}

export default RepoDard;
