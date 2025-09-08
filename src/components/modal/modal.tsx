import { MemoizedModalList } from '../modal-list/modal-list';
import { useAppDispatch, useAppSelector, useClickOutsideAndEscape, useCart } from '../../hooks';
import { useEffect, RefObject, useRef, memo, useCallback, useMemo } from 'react';
import { getCart, getModal } from '../../store/site-process/selectors';
import { setModal, setOverlay } from '../../store/site-process/site-process';
import { calcElems, lockScroll } from '../../utils';
import { toast } from 'react-toastify';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';

interface ModalProps {
  headerRef: RefObject<HTMLHeadingElement>;
}

function Modal({ headerRef }: ModalProps): JSX.Element {
  const isAuth = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isModal = useAppSelector(getModal);
  const cart = useAppSelector(getCart);
  const { clearCart } = useCart();
  const modalRef = useRef<HTMLElement>(null);
  const totalItems = useMemo(() => calcElems(cart?.map((item) => item.amount ?? 0) ?? []), [cart]);
  const totalPrice = useMemo(() => calcElems(cart?.map((item) => (item.amount ?? 0) * (item.price ?? 0)) ?? []), [cart]);
  const modalClassName = useMemo(() => `modal ${isModal ? 'modal--opened' : ''}`, [isModal]);
  const isCartEmpty = useMemo(() => !cart || cart.length === 0, [cart]);

  useEffect(() => {
    lockScroll(isModal ?? false);
    dispatch(setOverlay(isModal ?? false));

    if (isModal) {
      headerRef.current?.classList.add('header--zindex');
    } else {
      headerRef.current?.classList.remove('header--zindex');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModal]);

  const handleCloseModal = useCallback(() => {
    dispatch(setModal(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClearCart = useCallback(() => {
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleConfirm = useCallback(() => {
    if (isAuth === AuthorizationStatus.Auth) {
      clearCart();

      toast.success(`Purchased ${totalItems} items for ${totalPrice} gp!`, {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      toast.info('Please log in to complete your purchase', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      navigate(AppRoute.Login);
    }
    dispatch(setModal(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCartEmpty, totalItems, totalPrice, navigate]);

  useClickOutsideAndEscape(modalRef, handleCloseModal, isModal ?? false);

  return (
    <section ref={modalRef} className={modalClassName}>
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
        <MemoizedModalList />
        <div className="modal__foot">
          <div className="modal__bag">
            <div className="modal__sign">Total</div>
            <div className="modal__total">{totalPrice}<span>&nbsp;gp</span></div>
          </div>
          <button className="btn modal__submit" type="button" disabled={isCartEmpty} onClick={handleConfirm}>Confirm</button>
        </div>
      </div>
    </section>
  );
}

export const MemoizedModal = memo(Modal);
