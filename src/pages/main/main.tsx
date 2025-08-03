import Header from '../../components/header/header';
import Nav from '../../components/nav/nav';
import { HelmetProvider } from 'react-helmet-async';
import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks';
import { fetchFavoriteOffers } from '../../store/action';

function Main(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavoriteOffers());
  }, [dispatch]);

  return (
    <div className="page page--gray page--main">
      <HelmetProvider >
        <title>Главная страница</title>
      </HelmetProvider>
      <Header>
        <Nav />
      </Header>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container"></section>
        </div>
        <div className="cities">
          <div className="cities__places-container container"></div>
        </div>
      </main>
    </div>
  );
}

export default Main;
