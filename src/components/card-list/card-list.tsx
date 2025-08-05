import Card from '../card/card';
import { useAppSelector } from '../../hooks';
// eslint-disable-next-line no-console
/* eslint-disable */
// @ts-ignore

function CardList(): JSX.Element {
  const cards = useAppSelector(selectCards);

  return (
    <ul className="info__list">
      {cards?.map((card) => (
        <Card key={card.id} {...card} />
      ))}
    </ul>
  );
}

export default CardList;
