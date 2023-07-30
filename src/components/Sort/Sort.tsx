import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SortParams } from "../../enum/SortParams";
import { setSortParam, sortResults } from "../../redux/episodes/episodesSlice";
import { RootState } from "../../redux/store";
import sortIcon from "../../assets/sort-icon.svg";
import "./Sort.scss";

export const Sort: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const currentParam = useSelector(
    (state: RootState) => state.episodes.sortParam
  );
  const sortParams = [
    SortParams.DATE_EARLY,
    SortParams.DATE_RECENT,
    SortParams.ID,
  ];

  useEffect(() => {
    const handleClickOutSide = (evt: MouseEvent) => {
      const eventPath: any = evt.composedPath && evt.composedPath();

      if (!eventPath.includes(ref.current)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutSide);

    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  });

  return (
    <div className="sort" ref={ref} onClick={() => setIsOpen(true)}>
      <img src={sortIcon} alt="sort-icon" className="sort__icon" />
      <span className="sort__current">{currentParam}</span>
      {isOpen && (
        <div className="sort__menu">
          <ul className="sort__list">
            {sortParams.map((el, idx) => (
              <li
                className="sort__item"
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(setSortParam(el));
                  dispatch(sortResults());
                  setIsOpen(false);
                }}
              >
                {el}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
