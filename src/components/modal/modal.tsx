import ModalList from '../modal-list/modal-list';
import { useAppDispatch, useAppSelector, useClickOutsideAndEscape } from '../../hooks';
import { useEffect, RefObject, useRef } from 'react';
import { getCart, getModal } from '../../store/site-process/selectors';
import { setCart, setModal, setOverlay } from '../../store/site-process/site-process';
import { calcElems, lockScroll } from '../../utils';

interface ModalProps {
  headerRef: RefObject<HTMLHeadingElement>;
}

function Modal({ headerRef }: ModalProps): JSX.Element {
  const isModal = useAppSelector(getModal);
  const dispatch = useAppDispatch();
  const cart = useAppSelector(getCart);
  const totalItems = calcElems(cart?.map((item) => item.amount ?? 0) ?? []);
  const totalPrice = calcElems(cart?.map((item) => (item.amount ?? 0) * (item.price ?? 0)) ?? []);
  const modalRef = useRef<HTMLElement>(null);

  useEffect(() => {
    lockScroll(isModal ?? false);
    dispatch(setOverlay(isModal ?? false));

    if (isModal) {
      headerRef.current?.classList.add('header--zindex');
    } else {
      headerRef.current?.classList.remove('header--zindex');
    }
  }, [isModal, dispatch, headerRef]);

  const handleCloseModal = () => {
    dispatch(setModal(false));
  };

  const handleClearCart = () => {
    dispatch(setCart([]));
  };

  useClickOutsideAndEscape(modalRef, handleCloseModal, isModal ?? false);

  return (
    <section ref={modalRef} className={`modal ${isModal ? 'modal--opened' : ''}`}>
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
