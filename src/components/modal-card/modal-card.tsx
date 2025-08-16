import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCart } from '../../store/site-process/selectors';
import { setCart } from '../../store/site-process/site-process';
import { CardProps } from '../../types';

function ModalCard({id, name, alt, price, image, amount }: CardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(getCart);

  const handleMinus = () => {
    if (cart) {
      dispatch(setCart(cart.map((item) => item.id === id ? { ...item, amount: item.amount ? item.amount - 1 : 0 } : item)));
    }
  };

  const handlePlus = () => {
    if (cart) {
      dispatch(setCart(cart.map((item) => item.id === id ? { ...item, amount: item.amount ? item.amount + 1 : 1 } : item)));
    }
  };
  const handleDelete = () => {
    if (cart) {
      dispatch(setCart(cart.filter((item) => item.id !== id)));
    }
  };

  return (
    <li className="modal__item" data-id={id}>
      <div className="modal__card">
        <div className="modal__pic">
          <img src={`${import.meta.env.BASE_URL}img/${image}@1x.png`} srcSet={`${import.meta.env.BASE_URL}img/${image}@2x.png 2x`} width={96} height={96} alt={`${alt}.`} loading="lazy" />
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

export default ModalCard;
