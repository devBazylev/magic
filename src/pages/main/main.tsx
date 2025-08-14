import Header from '../../components/header/header';
import Filter from '../../components/filter/filter';
import CheckboxList from '../../components/checkbox-list/checkbox-list';
import CardList from '../../components/card-list/card-list';
import Modal from '../../components/modal/modal';
import Overlay from '../../components/overlay/overlay';
import { HelmetProvider } from 'react-helmet-async';
import Back from '../../components/back/back';
import { useState } from 'react';
import { filters, labels } from '../../const';

function Main(): JSX.Element {
  const [activeFilter, setActiveFilter] = useState<string>(filters[0]);
  const [activeCheckboxes, setActiveCheckboxes] = useState<string[]>(
    labels.filter((label) => label.checked).map((label) => label.id)
  );
  const handleCheckboxChange = (checkboxes: string[]) => {
    setActiveCheckboxes(checkboxes);
  };

  return (
    <div className="wrapper">
      <HelmetProvider >
        <title>You can buy something</title>
      </HelmetProvider>
      <Header />
      <main>
        <section className="info">
          <h2 className="info__title">Shop</h2>
          <CheckboxList handleCheckboxChange={handleCheckboxChange} activeCheckboxes={activeCheckboxes} />
          <Filter activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
          <CardList activeCheckboxes={activeCheckboxes} />
        </section>
        <Modal />
      </main>
      <Back />
      <Overlay />
    </div>
  );
}

export default Main;
