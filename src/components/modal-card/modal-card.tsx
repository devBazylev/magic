import { useCart } from '../../hooks';
import { CardProps } from '../../types';
import { memo, useCallback } from 'react';

function ModalCard({id, name, alt, price, image, amount }: CardProps): JSX.Element {
  const { decreaseAmount, increaseAmount, removeFromCart } = useCart();

  const handleMinus = useCallback(() => {
    decreaseAmount(id);
  }, [decreaseAmount, id]);

  const handlePlus = useCallback(() => {
    increaseAmount(id);
  }, [increaseAmount, id]);

  const handleDelete = useCallback(() => {
    removeFromCart(id);
  }, [removeFromCart, id]);

  return (
    <li className="modal__item" data-id={id}>
      <div className="modal__card">
        <div className="modal__pic">
          <img src={`img/${image}@1x.png`} srcSet={`img/${image}@2x.png 2x`} width={96} height={96} alt={`${alt}.`} loading="lazy" />
        </div>
        <div className="modal__box">
          <div className="modal__name">{name}</div>
          <div className="modal__price">{price}<span>gp</span></div>
        </div>
      </div>
      <div className="modal__wrap">
        <button className="modal__minus btn" type="button" onClick={handleMinus} />
        <div className="modal__board">{amount}</div>
        <button className="modal__plus btn" type="button" onClick={handlePlus} />
        <button className="modal__delete btn" type="button" onClick={handleDelete} />
      </div>
    </li>
  );
}

export const MemoizedModalCard = memo(ModalCard);
