import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { memo, useMemo } from 'react';

function Nav({ activePage }: { activePage: AppRoute }): JSX.Element {
  const navLinks = useMemo(() => [
    { route: AppRoute.Root, label: 'Shop' },
    { route: AppRoute.Tavern, label: 'Tavern' },
    { route: AppRoute.Quests, label: 'Quests' },
    { route: AppRoute.Inventory, label: 'Inventory' }
  ], []);

  return (
    <nav className="header__nav">
      {navLinks.map(({ route, label }) => (
        <Link key={route} className={`btn header__link ${activePage === route ? 'header__link--active' : ''}`} to={route}>{label}</Link>
      ))}
    </nav>
  );
}

export const MemoizedNav = memo(Nav);
