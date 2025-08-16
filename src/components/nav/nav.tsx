import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function Nav({ activePage }: { activePage: AppRoute }): JSX.Element {

  return (
    <nav className="header__nav">
      <Link className={`btn header__link ${activePage === AppRoute.Root ? 'header__link--active' : ''}`} to={AppRoute.Root}>Shop</Link>
      <Link className={`btn header__link ${activePage === AppRoute.Tavern ? 'header__link--active' : ''}`} to={AppRoute.Tavern}>Tavern</Link>
      <Link className={`btn header__link ${activePage === AppRoute.Quests ? 'header__link--active' : ''}`} to={AppRoute.Quests}>Quests</Link>
      <Link className={`btn header__link ${activePage === AppRoute.Inventory ? 'header__link--active' : ''}`} to={AppRoute.Inventory}>Inventory</Link>
    </nav>
  );
}

export default Nav;
