import React from "react";
import { Episode } from "../../redux/episodes/types";
import image from "../../assets/episode-image.png";
import "./EpisodeItem.scss";

export const EpisodeItem: React.FC<Episode> = (item) => {
  return (
    <div className="episode">
      <div className="episode__image">
        <img src={image} alt="episode-image" />
      </div>

      <h2>{item.name}</h2>
      <p>{item.air_date}</p>
      <p>{item.episode}</p>
    </div>
  );
};
