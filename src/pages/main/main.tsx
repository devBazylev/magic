import Header from '../../components/header/header';
import Back from '../../components/back/back';
import Modal from '../../components/modal/modal';
import Filter from '../../components/filter/filter';
import CheckboxList from '../../components/checkbox-list/checkbox-list';
import { MemoizedCardList } from '../../components/card-list/card-list';
import Overlay from '../../components/overlay/overlay';
import { Helmet } from 'react-helmet-async';
import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { filters, BackPath } from '../../const';
import { getCards } from '../../store/site-data/selectors';
import { useAppSelector } from '../../hooks';
import { loadCheckboxes, saveCheckboxes, loadFilter, saveFilter } from '../../utils';

function Main(): JSX.Element {
  const [activeFilter, setActiveFilter] = useState<string>(filters[0]);
  const [activeCheckboxes, setActiveCheckboxes] = useState<string[]>([]);
  const cards = useAppSelector(getCards);
  const checkedCards = useMemo(() => cards.filter((card) => activeCheckboxes.includes(card.tag)), [cards, activeCheckboxes]);
  const totalCards = useMemo(() => checkedCards.length, [checkedCards]);
  const headerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    setActiveCheckboxes(loadCheckboxes());
    setActiveFilter(loadFilter());
  }, []);

  const handleCheckboxChange = useCallback((checkboxes: string[]) => {
    setActiveCheckboxes(checkboxes);
    saveCheckboxes(checkboxes);
  }, []);

  const handleFilterChange = useCallback((filter: string) => {
    setActiveFilter(filter);
    saveFilter(filter);
  }, []);

  return (
    <div className="wrapper">
      <Helmet >
        <title>Shop</title>
      </Helmet>
      <Header headerRef={headerRef} />
      <main>
        <section className="info">
          <h1 className="info__title">Shop</h1>
          <CheckboxList handleCheckboxChange={handleCheckboxChange} activeCheckboxes={activeCheckboxes} headerRef={headerRef} />
          <Filter totalCards={totalCards} activeFilter={activeFilter} setActiveFilter={handleFilterChange} headerRef={headerRef} />
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
