import { useEffect, useState } from "react";
import searchIcon from "../../assets/search-icon.svg";
import { useDispatch } from "react-redux";
import { useDebounce } from "../../hooks/useDebounce";
import {
  clearResults,
  setSearchValue,
} from "../../redux/episodes/episodesSlice";
import "./SearchInput.scss";

export const SearchInput = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const debouncedValue = useDebounce(value, 800);

  useEffect(() => {
    dispatch(setSearchValue(debouncedValue));
  }, [debouncedValue]);

  function handlekeyUp(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (e.key === "Backspace" || e.key === "Delete") {
      dispatch(clearResults());
    }
  }

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setValue(e.target.value);
  }

  return (
    <div className="search">
      <input
        className="search__input"
        type="text"
        placeholder="Название эпизода..."
        value={value}
        onChange={handleOnChange}
        onKeyUp={handlekeyUp}
      />
      <img src={searchIcon} alt="search-icon" className="search__icon" />
    </div>
  );
};
