import Header from '../../components/header/header';
import { HelmetProvider } from 'react-helmet-async';
import { Div, H1, A} from './style';

function Error(): JSX.Element {
  return (
    <div className="wrapper">
      <HelmetProvider>
        <title>Страница отсутствует</title>
      </HelmetProvider>
      <Header />
      <Div>
        <H1 size={42}>404 not found</H1>
        <A to="/" size={32}>Go to main page</A>
      </Div>
    </div>
  );
}

export default Error;
