import "./Detail.css";
import { useLoaderData } from "react-router-dom";
import { Repo } from "../types/RepoType";
import connexion from "../services/connexion";
import { useState, useEffect } from "react";

export default function Detail() {
  const details = useLoaderData() as Repo[];
  const [data, setData] = useState<Repo>();

  useEffect(() => {
    if (details && details.length > 0) {
      setData(details[0]);
    }
  }, [details]);

  const handleLike = async () => {
    if (!data) {
      return;
    }
    try {
      await connexion.patch(`/api/repos/${data.id}`, {
        isFavorite: !data?.isFavorite,
      });
      const newRepo = { ...data } as Repo;
      newRepo.isFavorite = !data?.isFavorite;
      setData(newRepo);
    } catch (error) {
      console.error(error);
    }
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
          <button type="button" onClick={handleLike}>
            {detail.isFavorite ? "DisLike" : "Like"}
          </button>
        </div>
      ))}
    </div>
  );
}
