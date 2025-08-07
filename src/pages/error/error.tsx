import Header from '../../components/header/header';
import { HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';

function Error(): JSX.Element {
  return (
    <div className="wrapper">
      <HelmetProvider>
        <title>Страница отсутствует</title>
      </HelmetProvider>
      <Header />
      <section className='error'>
        <h1 className="error__title">404 not found</h1>
        <Link className="error__link" to="/">Go to main page</Link>
      </section>
    </div>
  );
}

export default Error;
