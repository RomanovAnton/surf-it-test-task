import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavBack } from "../NavBack/NavBack";
import { CharacterCard } from "../CharacterCard/CharacterCard";
import { Location } from "../../redux/character/types";
import axios from "axios";
import "./LocationInfo.scss";

export const LocationInfo = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Location>();
  const url = useSelector(
    (state: RootState) => state.character.info!.location.url
  );

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

  return (
    data && (
      <div className="location-info">
        <NavBack />
        <h2 className="location-info__title">Location name: {data.name}</h2>
        <p className="location-info__text">Dimension: {data.dimension}</p>
        <p className="location-info__text">Type: {data.type}</p>
        <h3 className="location-info__subtitle">Characters</h3>
        <ul className="location-info__characters">
          {data.residents.map((el: string, idx: number) => (
            <CharacterCard url={el} key={idx} />
          ))}
        </ul>
      </div>
    )
  );
};
