import { RefObject, useRef, useState } from 'react';
import { filters } from '../../const';
import { useAppDispatch, useClickOutsideAndEscape } from '../../hooks';
import { setOverlay } from '../../store/site-process/site-process';
import { lockScroll } from '../../utils';

interface FilterProps {
  totalCards: number;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  headerRef: RefObject<HTMLHeadingElement>;
}

function Filter({ totalCards, activeFilter, setActiveFilter, headerRef }: FilterProps): JSX.Element {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const filterRef = useRef<HTMLDivElement>(null);

  const handleBoardClick = () => {
    setIsOpened(!isOpened);
    dispatch(setOverlay(!isOpened));
    lockScroll(!isOpened);
    headerRef.current?.classList.add('header--zindex');
  };

  const handleOptionClick = (filter: string) => {
    setActiveFilter(filter);
    setIsOpened(!isOpened);
    dispatch(setOverlay(!isOpened));
    lockScroll(!isOpened);
    headerRef.current?.classList.remove('header--zindex');
  };

  useClickOutsideAndEscape(filterRef, handleBoardClick, isOpened);

  return (
    <div className="info__wrap">
      <div className="info__num">{totalCards} items</div>
      <div ref={filterRef} className={`info__select ${isOpened ? 'info__select--opened' : ''}`}>
        <button className="btn info__board" type="button" onClick={handleBoardClick}>{activeFilter}</button>
        <div className="info__drop">
          {filters.map((filter) => (
            <div className="info__option" key={filter} onClick={() => handleOptionClick(filter)}>{filter}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Filter;
