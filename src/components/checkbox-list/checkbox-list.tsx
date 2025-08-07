function CheckboxList(): JSX.Element {
  return (
    <div className="info__case">
      <button className="btn info__toggler" type="button" aria-label="Toggle checkbox menu.">Checkbox filters</button>
      <div className="info__choice">
        <label className="info__label btn">
          <input className="visually-hidden info__check" type="checkbox" name="Magic items" id="mi" tabIndex={-1} defaultChecked /><span className="info__backup" tabIndex={1} /><span className="info__checktext">Magic&nbsp;items</span>
        </label>
        <label className="info__label btn">
          <input className="visually-hidden info__check" type="checkbox" name="Weapons" id="weapons" tabIndex={-1} defaultChecked /><span className="info__backup" tabIndex={1} /><span className="info__checktext">Weapons</span>
        </label>
        <label className="info__label btn">
          <input className="visually-hidden info__check" type="checkbox" name="Elexirs" id="elexirs" tabIndex={-1} defaultChecked /><span className="info__backup" tabIndex={1} /><span className="info__checktext">Elexirs</span>
        </label>
        <label className="info__label btn">
          <input className="visually-hidden info__check" type="checkbox" name="Artefacts" id="artefacts" tabIndex={-1} defaultChecked /><span className="info__backup" tabIndex={1} /><span className="info__checktext">Artefacts</span>
        </label>
        <label className="info__label btn">
          <input className="visually-hidden info__check" type="checkbox" name="Armors" id="armors" tabIndex={-1} defaultChecked /><span className="info__backup" tabIndex={1} /><span className="info__checktext">Armors</span>
        </label>
      </div>
    </div>
  );
}

export default CheckboxList;
