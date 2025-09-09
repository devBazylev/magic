import { useState, useRef, useEffect, RefObject, memo, useCallback } from 'react';
import { labels } from '../../const';
import { useAppSelector, useAppDispatch, useClickOutsideAndEscape } from '../../hooks';
import { getMedia } from '../../store/site-process/selectors';
import { setOverlay } from '../../store/site-process/site-process';
import { lockScroll } from '../../utils';

interface CheckboxListProps {
  handleCheckboxChange: (checkboxes: string[]) => void;
  activeCheckboxes: string[];
  headerRef: RefObject<HTMLHeadingElement>;
}

function CheckboxList({handleCheckboxChange, activeCheckboxes, headerRef}: CheckboxListProps): JSX.Element {
  const dispatch = useAppDispatch();
  const isMobile = useAppSelector(getMedia);
  const [isActiveToggler, setActiveToggler] = useState(false);

  const choiceRef = useRef<HTMLDivElement>(null);

  const handleCheckbox = useCallback((id: string, checked: boolean) => {
    const newCheckboxes = checked ? [...activeCheckboxes, id] : activeCheckboxes.filter((item) => item !== id);
    handleCheckboxChange(newCheckboxes);
  }, [activeCheckboxes, handleCheckboxChange]);

  const handleToggler = useCallback(() => {
    setActiveToggler((prev) => !prev);
  }, []);

  useEffect(() => {
    dispatch(setOverlay(isActiveToggler));
    lockScroll(isActiveToggler);
  }, [isActiveToggler]);

  useEffect(() => {
    const choice = choiceRef.current;
    if (!choice || !isMobile) {
      return;
    }

    let startY = 0;

    const onTouchStart = (touch: TouchEvent) => {
      startY = touch.touches[0].clientY;
    };

    const onTouchEnd = (touch: TouchEvent) => {
      const endY = touch.changedTouches[0].clientY;

      if (endY - startY > 30) {
        setActiveToggler((prev) => !prev);
      }
    };

    if (isActiveToggler) {
      headerRef.current?.classList.add('header--zindex');
    } else {
      headerRef.current?.classList.remove('header--zindex');
    }

    choice.addEventListener('touchstart', onTouchStart, { passive: true });
    choice.addEventListener('touchend', onTouchEnd);

    return () => {
      choice.removeEventListener('touchstart', onTouchStart);
      choice.removeEventListener('touchend', onTouchEnd);
    };
  }, [isMobile, isActiveToggler]);

  useClickOutsideAndEscape(choiceRef, handleToggler, isActiveToggler);

  return (
    <div className="info__case">
      {isMobile && (<button className="btn info__toggler" type="button" aria-label="Toggle checkbox menu." onClick={handleToggler}>Checkbox filters</button>)}
      <div ref={choiceRef} className={`info__choice ${isActiveToggler ? 'info__choice--opened' : ''}`}>
        {labels.map((label) => (
          <label className="info__label btn" key={label.id}>
            <input
              className="visually-hidden info__check"
              type="checkbox"
              name={label.name}
              id={label.id}
              tabIndex={-1}
              checked={activeCheckboxes.includes(label.id)}
              onChange={(evt) => handleCheckbox(label.id, evt.target.checked)}
            />
            <span className="info__backup" tabIndex={0} />
            <span className="info__checktext">{label.text}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export const MemoizedCheckboxList = memo(CheckboxList);
