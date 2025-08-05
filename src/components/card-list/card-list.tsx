import Card from '../card/card';
import { useAppSelector } from '../../hooks';
import { getCards } from '../../store/site-data/selectors';
// eslint-disable-next-line no-console
/* eslint-disable */
// @ts-ignore

function CardList(): JSX.Element {
  const cards = useAppSelector(getCards);

  return (
    <ul className="info__list">
      {cards?.map((card) => (
        <Card key={card.id} {...card} />
      ))}
    </ul>
  );
}

export default CardList;
