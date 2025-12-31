import { memo, useCallback, useMemo } from 'react';
import Card from '../card/card';
import Spinner from '../spinner/spinner';
import { getCards, getIsCardsLoading } from '../../store/site-data/selectors';
import { comprator } from '../../const';
import { useAppSelector, useFavorites, useCart } from '../../hooks';
import { CardProps } from '../../types';

function CardList({checkedCards, activeFilter}: {checkedCards: CardProps[]; activeFilter: string}): JSX.Element {
  const isLoading = useAppSelector(getIsCardsLoading);
  const cards = useAppSelector(getCards);
  const cardsMap = useMemo(() => new Map(cards.map((card) => [card.id, card])), [cards]);
  const { favoritesSet, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();

  const handleAddToCart = useCallback((cardId: number) => {
    addToCart(cardId, cardsMap);
  }, [addToCart, cardsMap]);

  const sortedCards = useMemo(() => checkedCards.sort(comprator[activeFilter as keyof typeof comprator]), [checkedCards, activeFilter]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!checkedCards || checkedCards.length === 0) {
    return (
      <div className="info__nomatch">No cards match selected filters</div>
    );
  }

  return (
    <ul className="info__list">
      {sortedCards?.map((card) => (
        <Card key={card.id} {...card} isFav={favoritesSet.has(card.id)} handleAddToCart={() => handleAddToCart(card.id)} handleFav={() => toggleFavorite(card.id)} />
      ))}
    </ul>
  );
}

export const MemoizedCardList = memo(CardList);
