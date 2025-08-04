function Modal(): JSX.Element {
  return (
    <section className="modal">
      <div className="modal__cont">
        <h2 className="modal__title">Cart</h2>
        <button className="btn modal__cross" type="button">
          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 6L18 18" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <div className="modal__form">
        <div className="modal__head">
          <div className="modal__count">0<span>&nbsp;items</span></div>
          <button className="btn modal__clean" type="button">Clear the list</button>
        </div>
        <ul className="modal__list" />
        <div className="modal__foot">
          <div className="modal__bag">
            <div className="modal__sign">Total</div>
            <div className="modal__total">0<span>&nbsp;gp</span></div>
          </div>
          <button className="btn modal__submit" type="submit">Confirm</button>
        </div>
      </div>
    </section>
  );
}

export default Modal;
