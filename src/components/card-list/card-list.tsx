import Card from '../card/card';
import Spinner from '../spinner/spinner';
import { useAppSelector } from '../../hooks';
import { getCards, getIsCardsLoading } from '../../store/site-data/selectors';

function CardList({handleActiveCheckboxes}: {handleActiveCheckboxes: () => string[]}): JSX.Element {
  const cards = useAppSelector(getCards);
  const isLoading = useAppSelector(getIsCardsLoading);
  const activeCheckboxes = handleActiveCheckboxes();

  const checkedCards = cards.filter((card) => activeCheckboxes.includes(card.tag));

  if (isLoading) {
    return <Spinner />;
  }

  if (!checkedCards || checkedCards.length === 0) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: '#fff' }}>
        <p>No cards match selected filters</p>
        <p>Active filters: {activeCheckboxes.join(', ')}</p>
      </div>
    );
  }

  return (
    <ul className="info__list">
      {checkedCards?.map((card) => (
        <Card key={card.id} {...card} />
      ))}
    </ul>
  );
}

export default CardList;
