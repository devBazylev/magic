import { memo, useMemo, useCallback } from 'react';
import { MemoizedFavoritesCard } from '../favorites-card/favorites-card';
import { MemoizedSpinner } from '../spinner/spinner';
import { getCards, getIsCardsLoading } from '../../store/site-data/selectors';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getCart } from '../../store/site-process/selectors';
import { setCart } from '../../store/site-process/site-process';
import { CardProps } from '../../types';

function FavoritesList(): JSX.Element {
  const isLoading = useAppSelector(getIsCardsLoading);
  const cards = useAppSelector(getCards);
  const dispatch = useAppDispatch();
  const cart = useAppSelector(getCart);
  const cardsMap = useMemo(() => new Map(cards.map((card) => [card.id, card])), [cards]);
  const favoriteCards = useMemo(() => cards.filter((card) => card.fav), [cards]);

  const handleAddToCart = useCallback((evt: React.MouseEvent<HTMLButtonElement>) => {
    const btnId = evt.currentTarget.dataset.btnId;
    if (!btnId) {
      return;
    }

    const selectedCard = cardsMap.get(+btnId);
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

  if (isLoading) {
    return <MemoizedSpinner />;
  }

  if (!favoriteCards || favoriteCards.length === 0) {
    return (
      <div className="favorites__nomatch">No cards in favorites</div>
    );
  }

  return (
    <ul className="favorites__list">
      {favoriteCards.map((card: CardProps) => (
        <MemoizedFavoritesCard key={card.id} {...card} handleAddToCart={handleAddToCart} />
      ))}
    </ul>
  );
}

export const MemoizedFavoritesList = memo(FavoritesList);
