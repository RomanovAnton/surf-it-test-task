import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { CharacterCard } from "../CharacterCard/CharacterCard";
import { NavBack } from "../NavBack/NavBack";
import "./EpisodeInfo.scss";

export const EpisodeInfo = () => {
  const data = useSelector((state: RootState) => state.episodes.currentItem);

  return (
    data && (
      <div className="episode-info">
        <NavBack />
        <h2 className="episode-info__title">Episode: {data.name}</h2>
        <p className="episode-info__num">{data.episode}</p>
        <h3 className="episode-info__subtitle">Characters</h3>
        <ul className="episode-info__characters">
          {data.characters.map((el: string, idx: number) => (
            <CharacterCard url={el} key={idx} />
          ))}
        </ul>
      </div>
    )
  );
};
