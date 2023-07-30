import { useNavigate } from "react-router-dom";
import backIcon from "../../assets/back-arrow-icon.svg";
import "./NavBack.scss";

export const NavBack = () => {
  const navigate = useNavigate();
  return (
    <div className="back" onClick={() => navigate(-1)}>
      <img src={backIcon} alt="back-icon" className="back__icon" />
      Назад
    </div>
  );
};
