import { filters } from '../../const';

function Filter(): JSX.Element {
  return (
    <div className="info__wrap">
      <div className="info__num">0 items</div>
      <div className="info__select">
        <button className="btn info__board" type="button">${filters[0]}&nbsp;first</button>
        <div className="info__drop">
          {/* {filters.map((filter) => {
            <div className=`info__option info__option--{filter.toLowerCase()}`>{filter}&nbsp;first</div>
          })} */}
          {/* <div className="info__option info__option--cheap">Cheap&nbsp;first</div>
          <div className="info__option info__option--rare">Rare&nbsp;first</div>
          <div className="info__option info__option--common">Common&nbsp;first</div> */}
        </div>
      </div>
    </div>
  );
}

export default Filter;
