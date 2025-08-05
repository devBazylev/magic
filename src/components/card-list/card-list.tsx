import Card from '../card/card';
import Spinner from '../spinner/spinner';
import { useAppSelector } from '../../hooks';
import { getCards, getIsCardsLoading } from '../../store/site-data/selectors';

function CardList(): JSX.Element {
  const cards = useAppSelector(getCards);
  const isLoading = useAppSelector(getIsCardsLoading);

  if (isLoading) {
    return <Spinner />;
  }

  if (!cards || cards.length === 0) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: '#fff' }}>
        <p>No cards available</p>
        <p>Cards count: {cards?.length || 0}</p>
        <p>Loading state: {isLoading ? 'true' : 'false'}</p>
      </div>
    );
  }

  return (
    <ul className="info__list">
      {cards?.map((card) => (
        <Card key={card.id} {...card} />
      ))}
    </ul>
  );
}

export default CardList;
