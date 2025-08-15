import { CardProps } from '../../types';

function ModalCard({id, name, alt, price, image, amount }: CardProps): JSX.Element {
  return (
    <li className="modal__item" data-id={id}>
      <div className="modal__card">
        <div className="modal__pic">
          <img src={`${import.meta.env.BASE_URL}img/${image}@1x.png`} srcSet={`${import.meta.env.BASE_URL}img/${image}@2x.png 2x`} width={96} height={96} alt={`${alt}.`} loading="lazy" />
        </div>
        <div className="modal__box">
          <div className="modal__name">{name}</div>
          <div className="modal__price">{price}<span>GP</span></div>
        </div>
      </div>
      <div className="modal__wrap">
        <button className="modal__minus btn" type="button" />
        <div className="modal__board">{amount}</div>
        <button className="modal__plus btn" type="button" />
        <button className="modal__delete btn" type="button" />
      </div>
    </li>
  );
}

export default ModalCard;
