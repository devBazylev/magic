import Logo from '../../components/logo/logo';
import Nav from '../../components/nav/nav';
import UserStatus from '../../components/user-status/user-status';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function Header(): JSX.Element {
  return (
    <header className="header">
      <div className="header__wrap">
        <button className="btn header__toggler" type="button" aria-label="Toggle menu."></button>
        <Logo />
        <button className="btn header__cart" type="button" aria-label="Items in the cart."><span>0</span></button>
      </div>
      <div className="header__cont">
        <Nav />
        <div className="header__tools">
          <UserStatus />
          <Link className="btn header__tool" to={AppRoute.Favorites}>
            <img src="img/favorite.svg" width={22} height={22} alt="Favorite." />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
