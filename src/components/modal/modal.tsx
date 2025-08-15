import ModalList from '../modal-list/modal-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { getCart, getModal } from '../../store/site-process/selectors';
import { setCart, setModal, setOverlay } from '../../store/site-process/site-process';
import { calcElems, lockScroll } from '../../utils';

function Modal(): JSX.Element {
  const isModal = useAppSelector(getModal);
  const dispatch = useAppDispatch();
  const cart = useAppSelector(getCart);
  const totalItems = calcElems(cart?.map((item) => item.amount ?? 0) ?? []);
  const totalPrice = calcElems(cart?.map((item) => (item.amount ?? 0) * (item.price ?? 0)) ?? []);

  useEffect(() => {
    lockScroll(isModal ?? false);
    dispatch(setOverlay(isModal ?? false));
  }, [isModal, dispatch]);

  const handleCloseModal = () => {
    dispatch(setModal(false));
  };

  const handleClearCart = () => {
    dispatch(setCart([]));
  };

  return (
    <section className={`modal ${isModal ? 'modal--opened' : ''}`}>
      <div className="modal__cont">
        <h2 className="modal__title">Cart</h2>
        <button className="btn modal__cross" type="button" onClick={handleCloseModal}>
          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 6L18 18" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <div className="modal__form">
        <div className="modal__head">
          <div className="modal__count">{totalItems}<span>&nbsp;items</span></div>
          <button className="btn modal__clean" type="button" onClick={handleClearCart}>Clear the list</button>
        </div>
        <ModalList />
        <div className="modal__foot">
          <div className="modal__bag">
            <div className="modal__sign">Total</div>
            <div className="modal__total">{totalPrice}<span>&nbsp;gp</span></div>
          </div>
          <button className="btn modal__submit" type="submit">Confirm</button>
        </div>
      </div>
    </section>
  );
}

export default Modal;
