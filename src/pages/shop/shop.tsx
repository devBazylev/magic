import Header from '../../components/header/header';
import Nav from '../../components/nav/nav';
import { HelmetProvider } from 'react-helmet-async';
import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks';
import { fetchFavoriteOffers } from '../../store/action';

function Shop(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavoriteOffers());
  }, [dispatch]);

  return (
    <div className="page page--gray page--main">
      <HelmetProvider >
        <title>You can buy something</title>
      </HelmetProvider>
      <Header>
        <Nav />
      </Header>
      <div className="wrapper">
        <header className="header">
          <div className="header__wrap">
            <button className="btn header__toggler" type="button"></button>
            <a className="btn header__logo" href="index.html"><img src="img/content/logo-@1x.png" srcSet="img/content/logo-@2x.png 2x" width={131} height={26} alt="Логотип." /></a>
            <a className="btn header__cart" href="#"><span>0</span></a>
          </div>
          <div className="header__cont">
            <nav className="header__nav">
              <a className="btn header__link" href="#">Shop</a>
              <a className="btn header__link" href="#">Tavern</a>
              <a className="btn header__link" href="#">Quests</a>
              <a className="btn header__link" href="#">Inventory</a>
            </nav>
            <div className="header__tools">
              <a className="btn header__tool" href="#"><img src="img/sprite/profile.svg" width={22} height={22} alt="profile." /></a>
              <a className="btn header__tool" href="#"><img src="img/sprite/favorite.svg" width={22} height={22} alt="favorite." /></a>
            </div>
          </div>
        </header>
        <main>
          <section className="info">
            <h2 className="info__title">Shop</h2>
            <div className="info__case">
              <button className="btn info__toggler" type="button">Filters</button>
              <div className="info__choice">
                <label className="info__label btn">
                  <input className="visually-hidden info__check" type="checkbox" name="Magic items" id="mi" tabIndex={-1} defaultChecked /><span className="info__backup" tabIndex={1} /><span className="info__checktext">Magic&nbsp;items</span>
                </label>
                <label className="info__label btn">
                  <input className="visually-hidden info__check" type="checkbox" name="Weapons" id="weapons" tabIndex={-1} /><span className="info__backup" tabIndex={1} /><span className="info__checktext">Weapons</span>
                </label>
                <label className="info__label btn">
                  <input className="visually-hidden info__check" type="checkbox" name="Elexirs" id="elexirs" tabIndex={-1} /><span className="info__backup" tabIndex={1} /><span className="info__checktext">Elexirs</span>
                </label>
                <label className="info__label btn">
                  <input className="visually-hidden info__check" type="checkbox" name="Artefacts" id="artefacts" tabIndex={-1} /><span className="info__backup" tabIndex={1} /><span className="info__checktext">Artefacts</span>
                </label>
                <label className="info__label btn">
                  <input className="visually-hidden info__check" type="checkbox" name="Armors" id="armors" tabIndex={-1} /><span className="info__backup" tabIndex={1} /><span className="info__checktext">Armors</span>
                </label>
              </div>
            </div>
            <div className="info__wrap">
              <div className="info__num">0 items</div>
              <div className="info__select">
                <button className="btn info__board" type="button">Expensive&nbsp;first</button>
                <div className="info__drop">
                  <div className="info__option info__option--high">Expensive&nbsp;first</div>
                  <div className="info__option info__option--low">Cheap&nbsp;first</div>
                  <div className="info__option info__option--popular">Popular&nbsp;first</div>
                  <div className="info__option info__option--new">New&nbsp;first</div>
                </div>
              </div>
            </div>
            <ul className="info__list" />
          </section>
          <section className="modal">
            <div className="modal__cont">
              <h2 className="modal__title">Cart</h2>
              <button className="btn modal__cross" type="button"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6 6L18 18" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <div className="modal__form">
              <div className="modal__head">
                <div className="modal__count">0<span>&nbsp;items</span></div>
                <button className="btn modal__clean" type="button">Clear the list</button>
              </div>
              <ul className="modal__list" />
              <div className="modal__foot">
                <div className="modal__bag">
                  <div className="modal__sign">Total</div>
                  <div className="modal__total">0<span>&nbsp;gp</span></div>
                </div>
                <button className="btn modal__submit" type="submit">Confirm</button>
              </div>
            </div>
          </section>
        </main>
        <div className="overlay" />
      </div>
    </div>
  );
}

export default Shop;
