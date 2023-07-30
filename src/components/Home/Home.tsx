import React, { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { Episode } from "../../redux/episodes/types";
import { EpisodeCard } from "../EpisodeCard/EpisodeCard";
import { nextPage } from "../../redux/episodes/episodesSlice";
import { SearchInput } from "../SearchInput/SearchInput";
import { Errors } from "../../enum/Errors";
import { Sort } from "../Sort/Sort";
import arrowTopIcon from "../../assets/arrow-top-icon.svg";
import "./Home.scss";

export const Home = () => {
  const [btnIsVisible, setBtnIsVisible] = useState<boolean>(false);
  const episodes = useSelector((state: RootState) => state.episodes.results);
  const error = useSelector((state: RootState) => state.episodes.error);
  const dispatch = useAppDispatch();

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

    if (document.documentElement.scrollTop > window.innerHeight) {
      setBtnIsVisible(true);
    } else {
      setBtnIsVisible(false);
    }
  }

  function handleArrowClick() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
      )}

      {btnIsVisible && (
        <img
          src={arrowTopIcon}
          alt="arrow-icon"
          className="home__btn"
          onClick={handleArrowClick}
        />
      )}
    </div>
  );
};
