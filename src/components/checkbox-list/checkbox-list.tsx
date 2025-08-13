import { useState } from 'react';
import { labels } from '../../const';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getMedia } from '../../store/site-process/selectors';
import { setOverlay } from '../../store/site-process/site-process';

function CheckboxList(): JSX.Element {
  const dispatch = useAppDispatch();
  const isMobile = useAppSelector(getMedia);
  const [isActiveToggler, setActiveToggler] = useState(false);
  const [checkedItems, setCheckedItems] = useState<string[]>(
    labels.filter((label) => label.checked).map((label) => label.id),
  );
  // console.log(checkedItems);

  const handleCheckbox = (id: string, checked: boolean) => {
    setCheckedItems((prev) => {
      if (checked) {
        return [...prev, id];
      } else {
        return prev.filter((item) => item !== id);
      }
    });
  };

  const handleToggler = () => {
    setActiveToggler(!isActiveToggler);
    dispatch(setOverlay(!isActiveToggler));
  };

  return (
    <div className="info__case">
      {isMobile && <button className="btn info__toggler" type="button" aria-label="Toggle checkbox menu." onClick={handleToggler}>Checkbox filters</button>}
      <div className={`info__choice ${isActiveToggler ? 'info__choice--opened' : ''}`}>
        {labels.map((label) => (
          <label className="info__label btn" key={label.id}>
            <input
              className="visually-hidden info__check"
              type="checkbox"
              name={label.name}
              id={label.id}
              tabIndex={-1}
              checked={label.checked}
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

export default CheckboxList;
