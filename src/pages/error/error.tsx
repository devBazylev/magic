import Header from '../../components/header/header';
import Modal from '../../components/modal/modal';
import Overlay from '../../components/overlay/overlay';
import { HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { BackPath } from '../../const';
import Back from '../../components/back/back';
import { useRef } from 'react';

function Error(): JSX.Element {
  const headerRef = useRef<HTMLHeadingElement>(null);
  return (
    <div className="wrapper">
      <HelmetProvider>
        <title>Страница отсутствует</title>
      </HelmetProvider>
      <Header headerRef={headerRef} />
      <section className='error'>
        <h1 className="error__title">404 not found</h1>
        <Link className="error__link" to="/">Go to main page</Link>
        <Modal headerRef={headerRef} />
      </section>
      <Back path={BackPath.Error}/>
      <Overlay />
    </div>
  );
}

export default Error;
