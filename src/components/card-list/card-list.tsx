import { memo, useCallback, useMemo } from 'react';
import Card from '../card/card';
import { MemoizedSpinner } from '../spinner/spinner';
import { getCards, getIsCardsLoading } from '../../store/site-data/selectors';
import { comprator } from '../../const';
import { setCart } from '../../store/site-process/site-process';
import { useAppDispatch, useAppSelector, useFavorites } from '../../hooks';
import { getCart } from '../../store/site-process/selectors';
import { CardProps } from '../../types';

function CardList({checkedCards, activeFilter}: {checkedCards: CardProps[]; activeFilter: string}): JSX.Element {
  const isLoading = useAppSelector(getIsCardsLoading);
  const dispatch = useAppDispatch();
  const cart = useAppSelector(getCart);
  const cards = useAppSelector(getCards);
  const cardsMap = useMemo(() => new Map(cards.map((card) => [card.id, card])), [cards]);
  const { favoritesSet, toggleFavorite } = useFavorites();

  const handleAddToCart = useCallback((cardId: number) => {
    const selectedCard = cardsMap.get(cardId);
    if (!selectedCard) {
      return;
    }

    const newCart = [...(cart || [])];
    const existingCardIndex = newCart.findIndex((item) => item.id === selectedCard.id);

    if (existingCardIndex >= 0) {
      //rewrite object in array
      const newAmount = (newCart[existingCardIndex].amount ?? 0) + 1;
      newCart[existingCardIndex] = { ...newCart[existingCardIndex], amount: newAmount };
      dispatch(setCart(newCart));
    } else {
      dispatch(setCart([...newCart, { ...selectedCard, amount: 1 }]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart, cardsMap]);

  const sortedCards = useMemo(() => checkedCards.sort(comprator[activeFilter as keyof typeof comprator]), [checkedCards, activeFilter]);

  if (isLoading) {
    return <MemoizedSpinner />;
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
