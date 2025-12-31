import { memo, useMemo, useCallback } from 'react';
import { MemoizedFavoritesCard } from '../favorites-card/favorites-card';
import Spinner from '../spinner/spinner';
import { getCards, getIsCardsLoading } from '../../store/site-data/selectors';
import { useAppSelector, useFavorites, useCart } from '../../hooks';
import { CardProps } from '../../types';

function FavoritesList(): JSX.Element {
  const isLoading = useAppSelector(getIsCardsLoading);
  const cards = useAppSelector(getCards);
  const cardsMap = useMemo(() => new Map(cards.map((card) => [card.id, card])), [cards]);
  const { favoritesSet, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();
  const favoriteCards = useMemo(() => cards.filter((card) => favoritesSet.has(card.id)), [cards, favoritesSet]);

  const handleAddToCart = useCallback((cardId: number) => {
    addToCart(cardId, cardsMap);
  }, [addToCart, cardsMap]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!favoriteCards || favoriteCards.length === 0) {
    return (
      <div className="favorites__nomatch">No cards in favorites</div>
    );
  }

  return (
    <ul className="favorites__list">
      {favoriteCards.map((card: CardProps) => (
        <MemoizedFavoritesCard key={card.id} {...card} handleAddToCart={() => handleAddToCart(card.id)} handleFav={() => toggleFavorite(card.id)} />
      ))}
    </ul>
  );
}

export const MemoizedFavoritesList = memo(FavoritesList);
