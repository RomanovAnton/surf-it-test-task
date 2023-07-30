import React from "react";
import { Episode } from "../../redux/episodes/types";
import { EpisodeCard } from "../EpisodeCard/EpisodeCard";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import "./EpisodesList.scss";

export const EpisodesList = () => {
  const episodes = useSelector((state: RootState) => state.episodes.results);

  return (
    <ul className="home__list">
      {episodes.length > 0 && (
        <>
          <div className="home__line">
            <div className="home__line-title">
              {episodes[0].episode.slice(0, 3)}
            </div>
          </div>
          {episodes.map((el: Episode, idx) => (
            <React.Fragment key={el.id}>
              <li>
                <EpisodeCard {...el} />
              </li>

              {episodes[idx + 1] &&
                episodes[idx + 1].episode.slice(0, 3) !==
                  episodes[idx].episode.slice(0, 3) && (
                  <div className="home__line" key={idx}>
                    <div className="home__line-title">
                      {episodes[idx + 1].episode.slice(0, 3)}
                    </div>
                  </div>
                )}
            </React.Fragment>
          ))}
        </>
      )}
    </ul>
  );
};
