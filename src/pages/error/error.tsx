import Header from '../../components/header/header';
import { MemoizedModal } from '../../components/modal/modal';
import { MemoizedOverlay } from '../../components/overlay/overlay';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { BackPath } from '../../const';
import { MemoizedBack } from '../../components/back/back';
import { useRef, memo } from 'react';

function Error(): JSX.Element {
  const headerRef = useRef<HTMLHeadingElement>(null);
  return (
    <div className="wrapper">
      <Helmet>
        <title>Page not found</title>
      </Helmet>
      <Header headerRef={headerRef} />
      <section className="error">
        <h1 className="error__title">404 not found</h1>
        <Link className="error__link" to="/">Go to main page</Link>
        <MemoizedModal headerRef={headerRef} />
      </section>
      <MemoizedBack path={BackPath.Error}/>
      <MemoizedOverlay />
    </div>
  );
}

export const MemoizedError = memo(Error);
