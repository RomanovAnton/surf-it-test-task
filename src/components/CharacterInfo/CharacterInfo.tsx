import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { NavBack } from "../NavBack/NavBack";
import "./CharacterInfo.scss";

export const CharacterInfo: React.FC = () => {
  const data = useSelector((state: RootState) => state.character.info);
  return (
    <>
      {data && (
        <div className="character-info">
          <NavBack />
          <h1 className="character-info__name">{data.name}</h1>
          <div className="character-info__content">
            <div className="character-info__image">
              <img src={data.image} alt="image" />
            </div>
            <div className="character-info__about">
              <p className="character-info__text">
                Location: {data.location.name}
              </p>
              <p className="character-info__text">Status: {data.status}</p>
              <p className="character-info__text">Gender: {data.gender}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
