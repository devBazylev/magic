import { useState } from 'react';
import type { CardProps } from '../../types';

function Card({id, name, alt, price, tag, image, fav}: CardProps): JSX.Element {
  const [isFav, setIsFav] = useState(fav);

  const handleFav = () => {
    setIsFav(!isFav);
  };

  return (
    <li className="info__item" data-id={id} {...{ [`data-${tag}`]: true }}>
      <div className="info__pic">
        <img src={`${import.meta.env.BASE_URL}img/${image}@1x.png`} srcSet={`${import.meta.env.BASE_URL}img/${image}@2x.png 2x`} width={278} height={278} alt={`${alt}.`} loading="lazy" />
      </div>
      <div className="info__text">{name}</div>
      <div className="info__bag">
        <div className="info__price">{price}<span>GP</span></div>
        <button className="info__btn btn" type="button">
          <svg className="info__plus" width={20} height={20} viewBox="0 0 20 20" fill="none">
            <path d="M10 4.16663V15.8333" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4.16699 10H15.8337" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <button className={`btn info__fav ${isFav ? 'info__fav--active' : ''}`} type="button" onClick={handleFav}>
        <svg className="info__heart" fill="transparent" height="200" width="200" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" aria-label="Favorite.">
          <path d="M475.226,76.141c-24.802-27.568-59.176-42.75-96.791-42.75c-41.655,0-78.895,19.546-107.697,56.524c-5.791,7.435-10.682,14.864-14.738,21.751c-4.056-6.888-8.947-14.316-14.738-21.751C212.46,52.937,175.22,33.391,133.565,33.391c-37.615,0-71.989,15.182-96.791,42.75C13.059,102.499,0,137.806,0,175.557c0,42.904,18.5,84.194,58.22,129.938c35.093,40.416,84.726,82.429,142.195,131.076c14.418,12.205,29.326,24.825,44.72,38.018c3.127,2.68,6.995,4.019,10.866,4.019c3.87,0,7.739-1.34,10.866-4.019c15.393-13.194,30.301-25.814,44.72-38.018c57.47-48.648,107.102-90.661,142.195-131.076C493.5,259.751,512,218.461,512,175.557C512,137.806,498.941,102.499,475.226,76.141z"/>
          <path d="M428.567,283.602c-33.411,38.479-82.137,79.724-138.556,127.482c-11.046,9.35-22.378,18.943-34.011,28.863c-11.634-9.921-22.965-19.514-34.011-28.863c-56.419-47.758-105.145-89.003-138.556-127.482c-34.608-39.857-50.041-73.179-50.041-108.045c0-62.011,43.065-108.774,100.174-108.774c31.144,0,58.322,14.44,80.78,42.919c17.694,22.438,25.697,45.493,25.837,45.901c2.286,6.772,8.637,11.321,15.787,11.337c0.012,0,0.023,0,0.037,0c7.146,0,13.508-4.566,15.811-11.333c0.079-0.232,8.075-23.378,25.838-45.905c22.457-28.479,49.635-42.919,80.779-42.919c57.109,0,100.174,46.763,100.174,108.774C478.609,210.423,463.175,243.745,428.567,283.602z" fill="none" stroke="#fc2621" strokeWidth="16"/>
        </svg>
      </button>
    </li>
  );
}

export default Card;
