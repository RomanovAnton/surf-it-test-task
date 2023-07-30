import { Episode } from "../../redux/episodes/types";
import { useDispatch, useSelector } from "react-redux";
import {
  clearResults,
  setCurrentItem,
  setSearchValue,
} from "../../redux/episodes/episodesSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import image from "../../assets/episode-image.png";
import "./EpisodeItem.scss";

export const EpisodeItem: React.FC<Episode> = (item) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchValue = useSelector(
    (state: RootState) => state.episodes.searchValue
  );

  function handleClick() {
    dispatch(setCurrentItem(item));
    navigate(`/episode/${item.id}`);
    dispatch(setSearchValue(""));
    if (searchValue) {
      dispatch(clearResults());
    }
  }

  return (
    <div className="episode" onClick={handleClick}>
      <div className="episode__image">
        <img src={image} alt="episode-image" />
      </div>
      <h2>{item.name}</h2>
      <p>{item.air_date}</p>
      <p>{item.episode}</p>
    </div>
  );
};
