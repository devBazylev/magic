import Header from '../../components/header/header';
import { MemoizedFilter } from '../../components/filter/filter';
import { MemoizedCheckboxList } from '../../components/checkbox-list/checkbox-list';
import { MemoizedCardList } from '../../components/card-list/card-list';
import Modal from '../../components/modal/modal';
import Overlay from '../../components/overlay/overlay';
import Back from '../../components/back/back';
import { HelmetProvider } from 'react-helmet-async';
import { useState, useRef } from 'react';
import { filters, labels, BackPath } from '../../const';
import { getCards } from '../../store/site-data/selectors';
import { useAppSelector } from '../../hooks';

function Main(): JSX.Element {
  const [activeFilter, setActiveFilter] = useState<string>(filters[0]);
  const [activeCheckboxes, setActiveCheckboxes] = useState<string[]>(
    labels.filter((label) => label.checked).map((label) => label.id)
  );
  const cards = useAppSelector(getCards);
  const checkedCards = cards.filter((card) => activeCheckboxes.includes(card.tag));
  const totalCards = checkedCards.length;
  const headerRef = useRef<HTMLHeadingElement>(null);

  const handleCheckboxChange = (checkboxes: string[]) => {
    setActiveCheckboxes(checkboxes);
  };

  return (
    <div className="wrapper">
      <HelmetProvider >
        <title>You can buy something</title>
      </HelmetProvider>
      <Header headerRef={headerRef} />
      <main>
        <section className="info">
          <h2 className="info__title">Shop</h2>
          <MemoizedCheckboxList handleCheckboxChange={handleCheckboxChange} activeCheckboxes={activeCheckboxes} headerRef={headerRef} />
          <MemoizedFilter totalCards={totalCards} activeFilter={activeFilter} setActiveFilter={setActiveFilter} headerRef={headerRef} />
          <MemoizedCardList checkedCards={checkedCards} activeFilter={activeFilter}/>
        </section>
        <Modal headerRef={headerRef} />
      </main>
      <Back path={BackPath.Root}/>
      <Overlay />
    </div>
  );
}

export default Main;
