import { useState } from 'react';
import { filters } from '../../const';
import { useAppDispatch } from '../../hooks';
import { setOverlay } from '../../store/site-process/site-process';
import { lockScroll } from '../../utils';

function Filter({ totalCards, activeFilter, setActiveFilter }: { totalCards: number; activeFilter: string; setActiveFilter: (filter: string) => void }): JSX.Element {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleBoardClick = () => {
    setIsOpened(!isOpened);
    dispatch(setOverlay(!isOpened));
    lockScroll(!isOpened);
  };

  const handleOptionClick = (filter: string) => {
    setActiveFilter(filter);
    setIsOpened(!isOpened);
    dispatch(setOverlay(!isOpened));
    lockScroll(!isOpened);
  };

  return (
    <div className="info__wrap">
      <div className="info__num">{totalCards} items</div>
      <div className={`info__select ${isOpened ? 'info__select--opened' : ''}`}>
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
