import { memo, useMemo } from 'react';
import { MemoizedFavoritesCard } from '../favorites-card/favorites-card';
import { MemoizedSpinner } from '../spinner/spinner';
import { getCards, getIsCardsLoading } from '../../store/site-data/selectors';
import { useAppSelector } from '../../hooks';
import { CardProps } from '../../types';

function FavoritesList(): JSX.Element {
  const isLoading = useAppSelector(getIsCardsLoading);
  const cards = useAppSelector(getCards);

  const favoriteCards = useMemo(() => cards.filter((card) => card.fav), [cards]);

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
        <MemoizedFavoritesCard key={card.id} {...card} />
      ))}
    </ul>
  );
}

export const MemoizedFavoritesList = memo(FavoritesList);
