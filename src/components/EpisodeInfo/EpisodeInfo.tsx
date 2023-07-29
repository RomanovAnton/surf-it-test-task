import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import "./EpisodeInfo.scss";

export const EpisodeInfo = () => {
  const data = useSelector((state: RootState) => state.episodes.currentItem);

  return data && <h2>{data.name}</h2>;
};
