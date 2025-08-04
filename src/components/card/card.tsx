function Card(): JSX.Element {
  return (
    <li className="info__item" data-id={4} data-new>
      <div className="info__pic">
        <img src="/img/info01@1x.png" srcSet="/img/info01@2x.png 2x" width={278} height={278} alt="Sword." loading="lazy" />
      </div>
      <div className="info__text">Sword</div>
      <div className="info__bag">
        <div className="info__price">194<span>GP</span></div>
        <button className="info__btn btn" type="button">
          <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
            <path d="M10 4.16663V15.8333" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4.16699 10H15.8337" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </li>
  );
}

export default Card;
