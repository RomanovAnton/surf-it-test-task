import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Character } from "../../redux/character/types";
import { useDispatch } from "react-redux";
import { setCurrentCharacter } from "../../redux/character/characterSlice";
import axios from "axios";
import placeholderImage from "../../assets/no-image.png";
import "./CharacterCard.scss";

export const CharacterCard: React.FC<{ url: string }> = ({ url }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [data, setData] = useState<Character>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(url);
        setData(data);
      } catch (error) {
        alert("Server Error");
        navigate(-1);
      }
    };
    getData();
  }, []);

  function handleImageLoad() {
    setImageLoaded(true);
  }

  function handleCardClick() {
    dispatch(setCurrentCharacter(data!));
    navigate(`/character/${data!.id}`);
  }

  return (
    <>
      {data && (
        <li className="character" onClick={handleCardClick}>
          <div className="character__image">
            <img
              src={imageLoaded ? data.image : placeholderImage}
              alt="card-image"
              onLoad={handleImageLoad}
            />
          </div>
          <div className="character__content">
            <h2 className="character__name">{data.name}</h2>
            <p className="character__text">Location: {data.location.name}</p>
            <p className="character__text">Status: {data.status}</p>
          </div>
        </li>
      )}
    </>
  );
};
