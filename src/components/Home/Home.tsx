import React, { useEffect } from "react";
import { RootState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { Episode } from "../../redux/episodes/types";
import { EpisodeItem } from "../EpisodeItem/EpisodeItem";
import { nextPage } from "../../redux/episodes/episodesSlice";
import { SearchInput } from "../SearchInput/SearchInput";
import { Errors } from "../../enum/Errors";
import { Sort } from "../Sort/Sort";
import "./Home.scss";

export const Home = () => {
  const dispatch = useAppDispatch();
  const episodes = useSelector((state: RootState) => state.episodes.results);
  const error = useSelector((state: RootState) => state.episodes.error);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      dispatch(nextPage());
    }
  }

  return (
    <div className="home">
      <div className="home__filter">
        <SearchInput />
        <Sort />
      </div>

      {error == Errors.NOT_FOUND ? (
        <p className="home__notfound">
          По вашему запросу ничего не найдено. Измените параметры поиска
        </p>
      ) : (
        <ul className="home__list">
          {episodes.length > 0 &&
            episodes.map((el: Episode, idx) => (
              <React.Fragment key={el.id}>
                <li>
                  <EpisodeItem {...el} />
                </li>
                {episodes[idx + 1] &&
                  episodes[idx + 1].episode.slice(0, 3) !==
                    episodes[idx].episode.slice(0, 3) && (
                    <div className="home__line" key={idx}></div>
                  )}
              </React.Fragment>
            ))}
        </ul>
      )}
    </div>
  );
};
