import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function Nav(): JSX.Element {
  return (
    <nav className="header__nav">
      <Link className="btn header__link" to={AppRoute.Root}>Shop</Link>
      <Link className="btn header__link" to={AppRoute.Tavern}>Tavern</Link>
      <Link className="btn header__link" to={AppRoute.Quests}>Quests</Link>
      <Link className="btn header__link" to={AppRoute.Inventory}>Inventory</Link>
    </nav>
  );
}

export default Nav;
