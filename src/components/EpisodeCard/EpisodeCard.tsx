import { Episode } from "../../redux/episodes/types";
import { useDispatch, useSelector } from "react-redux";
import {
  clearResults,
  setCurrentItem,
  setSearchValue,
  setSortParam,
} from "../../redux/episodes/episodesSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import image from "../../assets/episode-image.png";
import { SortParams } from "../../enum/SortParams";
import "./EpisodeCard.scss";

export const EpisodeCard: React.FC<Episode> = (item) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchValue = useSelector(
    (state: RootState) => state.episodes.searchValue
  );

  function handleClick() {
    dispatch(setCurrentItem(item));
    navigate(`/episode/${item.id}`);
    dispatch(setSearchValue(""));
    dispatch(setSortParam(SortParams.ID));
    if (searchValue) {
      dispatch(clearResults());
    }
  }

  return (
    <div className="episode" onClick={handleClick}>
      <div className="episode__image">
        <img src={image} alt="episode-image" />
      </div>
      <div className="episode__content">
        <h2 className="episode__name">{item.name}</h2>
        <p className="episode__text">{item.air_date}</p>
        <p className="episode__text">{item.episode}</p>
      </div>
    </div>
  );
};
