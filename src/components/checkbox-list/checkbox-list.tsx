import { labels } from '../../const';

function CheckboxList(): JSX.Element {
  // const getCheckedIds = () => {
  //   const checkedBoxes  = choice.querySelectorAll('.info__check:checked');
  //   const ids = Array.from(checkedBoxes).map(item => item.id);

  //   return ids;
  // };

  // const showCheckedCards = () => {
  //   const dataForCheck = getCheckedIds();
  //   let i = 0;

  //   sourceCards.forEach(card => {
  //     const dataAttrs = card.dataset;
  //     const dataValues = Object.keys(dataAttrs).join(' ');

  //     const hasAnyData = dataForCheck.some(word => dataValues.includes(word));

  //     if (!hasAnyData) {
  //       card.classList.add('info__item--none');
  //     } else {
  //       card.classList.remove('info__item--none');
  //       i++;
  //     }
  //   });
  //   counter.textContent = `${i} ${getWordByNumber(i)}`
  // };

  return (
    <div className="info__case">
      <button className="btn info__toggler" type="button" aria-label="Toggle checkbox menu.">Checkbox filters</button>
      <div className="info__choice">
        {labels.map((label) => (
          <label className="info__label btn" key={label.id}>
            <input className="visually-hidden info__check" type="checkbox" name={label.name} id={label.id} tabIndex={-1} defaultChecked={label.checked} />
            <span className="info__backup" tabIndex={0} />
            <span className="info__checktext">{label.text}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default CheckboxList;
