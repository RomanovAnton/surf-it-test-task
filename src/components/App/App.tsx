import { Routes, Route } from "react-router-dom";
import { Home } from "../Home/Home";
import { EpisodeInfo } from "../EpisodeInfo/EpisodeInfo";
import { useEffect } from "react";
import { RootState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import fetchEpisodes from "../../redux/episodes/asyncAction";
import "./App.scss";

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentPage, searchValue } = useSelector(
    (state: RootState) => state.episodes
  );

  useEffect(() => {
    dispatch(fetchEpisodes({ currentPage, searchValue }));
  }, [currentPage, searchValue]);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="episode/:pizzaId" element={<EpisodeInfo />} />
      </Routes>
    </div>
  );
};
