import Header from '../../components/header/header';
import Modal from '../../components/modal/modal';
import Overlay from '../../components/overlay/overlay';
import Back from '../../components/back/back';
import { HelmetProvider } from 'react-helmet-async';
import { useRef } from 'react';
import { BackPath } from '../../const';

function Favorites(): JSX.Element {
  const headerRef = useRef<HTMLHeadingElement>(null);

  return (
    <div className="wrapper">
      <HelmetProvider >
        <title>Favorites</title>
      </HelmetProvider>
      <Header headerRef={headerRef} />
      <main>
        <section className="favorites">
          <h2 className="favorites__title">Favorites</h2>
        </section>
        <Modal headerRef={headerRef} />
      </main>
      <Back path={BackPath.Favorites}/>
      <Overlay />
    </div>
  );
}

export default Favorites;
