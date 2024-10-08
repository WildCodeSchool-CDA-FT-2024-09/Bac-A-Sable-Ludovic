import "./Detail.css";
import { useLoaderData } from "react-router-dom";
import { Repo } from "../types/RepoType";
import { useState } from "react";

export default function Detail() {
  const details = useLoaderData() as Repo[];
  const [isFavorite, setIsFavorite] = useState<number[]>([]);

  const handleLike = (id: number) => {
    setIsFavorite((prevIsFavorite) =>
      prevIsFavorite.includes(id) ? prevIsFavorite : [...prevIsFavorite, id]
    );
  };

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
          <button onClick={() => handleLike(detail.id)}>Like</button>
        </div>
      ))}
    </div>
  );
}
