import React from 'react';
import Card from '../card/card';
import Spinner from '../spinner/spinner';
import { getCards, getIsCardsLoading } from '../../store/site-data/selectors';
import { comprator } from '../../const';
import { setCart } from '../../store/site-process/site-process';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCart } from '../../store/site-process/selectors';

function CardList({activeCheckboxes, activeFilter}: {activeCheckboxes: string[]; activeFilter: string}): JSX.Element {
  const cards = useAppSelector(getCards);
  const isLoading = useAppSelector(getIsCardsLoading);
  const dispatch = useAppDispatch();
  const cart = useAppSelector(getCart);
  const checkedCards = cards.filter((card) => activeCheckboxes.includes(card.tag));

  if (isLoading) {
    return <Spinner />;
  }

  const handleAddToCart = (evt: React.MouseEvent<HTMLButtonElement>) => {
    const btnId = evt.currentTarget.dataset.btnId;
    if (!btnId) {
      return;
    }
    const selectedCard = cards.find((card) => card.id === +btnId);
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
  };

  if (!checkedCards || checkedCards.length === 0) {
    return (
      <div className="info__nomatch">No cards match selected filters</div>
    );
  }

  const sortedCards = checkedCards.sort(comprator[activeFilter as keyof typeof comprator]);

  return (
    <ul className="info__list">
      {sortedCards?.map((card) => (
        <Card key={card.id} {...card} handleAddToCart={handleAddToCart}/>
      ))}
    </ul>
  );
}

export default CardList;
