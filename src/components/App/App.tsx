import { Routes, Route } from "react-router-dom";
import { Home } from "../Home/Home";
import { EpisodeInfo } from "../EpisodeInfo/EpisodeInfo";
import { useEffect } from "react";
import { RootState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { CharacterInfo } from "../CharacterInfo/CharacterInfo";
import { LocationInfo } from "../LocationInfo/LocationInfo";
import fetchEpisodes from "../../redux/episodes/asyncAction";
import { Header } from "../Header/Header";
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
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="episode/:episodeId" element={<EpisodeInfo />} />
        <Route path="character/:characterId" element={<CharacterInfo />} />
        <Route path="location/:locationName" element={<LocationInfo />} />
      </Routes>
    </div>
  );
};
