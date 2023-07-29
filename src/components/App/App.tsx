import { useEffect } from "react";
import fetchEpisodes from "../../redux/episodes/asyncAction";
import { RootState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { Episode } from "../../redux/episodes/types";
import { EpisodeItem } from "../EpisodeItem/EpisodeItem";
import { nextPage } from "../../redux/episodes/episodesSlice";
import "./App.scss";

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const episodes = useSelector((state: RootState) => state.episodes.results);
  const { currentPage, searchValue } = useSelector(
    (state: RootState) => state.episodes
  );

  useEffect(() => {
    dispatch(fetchEpisodes({ currentPage, searchValue }));
  }, [currentPage]);

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
    <div className="app">
      <ul className="app__list">
        {episodes.length > 0 &&
          episodes.map((el: Episode) => <EpisodeItem {...el} key={el.id} />)}
      </ul>
    </div>
  );
};
