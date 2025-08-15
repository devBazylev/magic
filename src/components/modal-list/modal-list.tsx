import ModalCard from '../modal-card/modal-card';
import { useAppSelector } from '../../hooks';
import { getCart } from '../../store/site-process/selectors';
import { CardProps } from '../../types';

function ModalList(): JSX.Element {
  const cart = useAppSelector(getCart);

  return (
    <ul className="modal__list">
      {cart?.map((card: CardProps) => (
        <ModalCard key={card.id} {...card}/>
      ))}
    </ul>
  );
}

export default ModalList;
