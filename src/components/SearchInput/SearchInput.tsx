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
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    dispatch(setSearchValue(debouncedValue));

    if (value === "") {
      dispatch(clearResults());
    }
  }, [debouncedValue]);

  return (
    <div className="search">
      <input
        className="search__input"
        type="text"
        placeholder="Название эпизода..."
        value={value}
        onChange={(evt) => setValue(evt.target.value)}
      />
      <img src={searchIcon} alt="search-icon" className="search__icon" />
    </div>
  );
};
