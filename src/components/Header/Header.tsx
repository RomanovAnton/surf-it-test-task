import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import "./Header.scss";

export const Header = () => {
  const navigate = useNavigate();

  function handleLogoClick() {
    navigate("/");
  }

  return (
    <header className="header">
      <img
        src={logo}
        alt="logo"
        className="header__logo"
        onClick={handleLogoClick}
      />
    </header>
  );
};
