import { useEffect } from "react";
import fetchEpisodes from "../../redux/episodes/asyncAction";
import { RootState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { Episode } from "../../redux/episodes/types";
import "./App.scss";

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const episodes = useSelector((state: RootState) => state.episodes.results);
  const { currentPage, searchValue } = useSelector(
    (state: RootState) => state.episodes
  );

  useEffect(() => {
    dispatch(fetchEpisodes({ currentPage, searchValue }));
  }, []);

  return (
    <div className="block">
      <h2>{currentPage}</h2>
      <ul>{episodes.length > 0 && episodes.map((el: Episode) => el.name)}</ul>
    </div>
  );
};
