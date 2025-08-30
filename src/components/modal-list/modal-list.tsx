import { MemoizedModalCard } from '../modal-card/modal-card';
import { useAppSelector } from '../../hooks';
import { getCart } from '../../store/site-process/selectors';
import { CardProps } from '../../types';
import { memo } from 'react';

function ModalList(): JSX.Element {
  const cart = useAppSelector(getCart);

  return (
    <ul className="modal__list">
      {cart?.map((card: CardProps) => (
        <MemoizedModalCard key={card.id} {...card}/>
      ))}
    </ul>
  );
}

export const MemoizedModalList = memo(ModalList);
