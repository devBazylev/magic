import Header from '../../components/header/header';
import Filter from '../../components/filter/filter';
import CheckboxList from '../../components/checkbox-list/checkbox-list';
import Modal from '../../components/modal/modal';
import { HelmetProvider } from 'react-helmet-async';

function Shop(): JSX.Element {
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
          <ul className="info__list" />
        </section>
        <Modal />
      </main>
      <div className="overlay" />
    </div>
  );
}

export default Shop;
