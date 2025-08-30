import Header from '../../components/header/header';
import Back from '../../components/back/back';
import { MemoizedModal } from '../../components/modal/modal';
import { MemoizedFilter } from '../../components/filter/filter';
import { MemoizedCheckboxList } from '../../components/checkbox-list/checkbox-list';
import { MemoizedCardList } from '../../components/card-list/card-list';
import { MemoizedOverlay } from '../../components/overlay/overlay';
import { Helmet } from 'react-helmet-async';
import { useState, useRef, useCallback, useMemo, memo } from 'react';
import { filters, labels, BackPath } from '../../const';
import { getCards } from '../../store/site-data/selectors';
import { useAppSelector } from '../../hooks';

function Main(): JSX.Element {
  const [activeFilter, setActiveFilter] = useState<string>(filters[0]);
  const [activeCheckboxes, setActiveCheckboxes] = useState<string[]>(
    labels.filter((label) => label.checked).map((label) => label.id)
  );
  const cards = useAppSelector(getCards);
  const checkedCards = useMemo(() => cards.filter((card) => activeCheckboxes.includes(card.tag)), [cards, activeCheckboxes]);
  const totalCards = useMemo(() => checkedCards.length, [checkedCards]);
  const headerRef = useRef<HTMLHeadingElement>(null);

  const handleCheckboxChange = useCallback((checkboxes: string[]) => {
    setActiveCheckboxes(checkboxes);
  }, []);

  const handleFilterChange = useCallback((filter: string) => {
    setActiveFilter(filter);
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
          <MemoizedCheckboxList handleCheckboxChange={handleCheckboxChange} activeCheckboxes={activeCheckboxes} headerRef={headerRef} />
          <MemoizedFilter totalCards={totalCards} activeFilter={activeFilter} setActiveFilter={handleFilterChange} headerRef={headerRef} />
          <MemoizedCardList checkedCards={checkedCards} activeFilter={activeFilter}/>
        </section>
        <MemoizedModal headerRef={headerRef} />
      </main>
      <Back path={BackPath.Root}/>
      <MemoizedOverlay />
    </div>
  );
}

export const MemoizedMain = memo(Main);
