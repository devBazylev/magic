import Header from '../../components/header/header';
import Modal from '../../components/modal/modal';
import Overlay from '../../components/overlay/overlay';
import Back from '../../components/back/back';
import { Helmet } from 'react-helmet-async';
import { useRef } from 'react';
import { BackPath } from '../../const';
import { MemoizedFavoritesList } from '../../components/favorites-list/favorites-list';

function Favorites(): JSX.Element {
  const headerRef = useRef<HTMLHeadingElement>(null);

  return (
    <div className="wrapper">
      <Helmet >
        <title>Favorites</title>
      </Helmet>
      <Header headerRef={headerRef} />
      <main>
        <section className="favorites">
          <h1 className="favorites__title">Favorites</h1>
          <MemoizedFavoritesList />
        </section>
        <Modal headerRef={headerRef} />
      </main>
      <Back path={BackPath.Favorites}/>
      <Overlay />
    </div>
  );
}

export default Favorites;
