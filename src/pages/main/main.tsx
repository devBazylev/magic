import Header from '../../components/header/header';
import Filter from '../../components/filter/filter';
import CheckboxList from '../../components/checkbox-list/checkbox-list';
import CardList from '../../components/card-list/card-list';
import Modal from '../../components/modal/modal';
import Overlay from '../../components/overlay/overlay';
import { HelmetProvider } from 'react-helmet-async';
import Back from '../../components/back/back';

function Main(): JSX.Element {
  return (
    <div className="wrapper">
      <HelmetProvider >
        <title>You can buy something</title>
      </HelmetProvider>
      <Header />
      <main>
        <section className="info">
          <h2 className="info__title">Shop</h2>
          <CheckboxList />
          <Filter />
          <CardList />
        </section>
        <Modal />
      </main>
      <Back />
      <Overlay />
    </div>
  );
}

export default Main;
