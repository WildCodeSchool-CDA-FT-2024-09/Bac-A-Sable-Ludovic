import "./Detail.css";
import { useLoaderData } from "react-router-dom";
import { Repo } from "../types/RepoType";

export default function Detail() {
  const details = useLoaderData() as Repo[];

  return (
    <div className="detailBloc">
      <h1 className="titleDetail">Détails du Repo</h1>
      {details.map((detail, index) => (
        <div key={index}>
          <p>ID : {detail.id}</p>
          <p>Nom : {detail.name}</p>
          <p>
            URL : <a href={detail.url}>{detail.url}</a>
          </p>
        </div>
      ))}
    </div>
  );
}
