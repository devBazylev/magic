import { Link } from 'react-router-dom';
import { AuthorizationStatus, AppRoute } from '../../const';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { Span } from './style';
import { getAuthorizationStatus, getUser } from '../../store/user-process/selectors';
import { getFavoriteOffers } from '../../store/site-data/selectors';
import { logoutUser } from '../../store/action';

function Nav(): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const user = useAppSelector(getUser);
  const favoriteOffers = useAppSelector(getFavoriteOffers);

  const handleSignOutClick = () => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(logoutUser());
    }
  };

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {authorizationStatus === AuthorizationStatus.Auth && (
          <li className="header__nav-item user">
            <Link to={AppRoute.Favorites} className="header__nav-link header__nav-link--profile">
              <div className="header__avatar-wrapper user__avatar-wrapper"></div>
              <span className="header__user-name user__name">{user}</span>
              <Span>{favoriteOffers.length}</Span>
            </Link>
          </li>
        )}
        <li className="header__nav-item">
          {authorizationStatus === AuthorizationStatus.Auth ? (
            <Link className="header__nav-link" onClick={handleSignOutClick} to={AppRoute.Root}>
              <span className="header__signout">Sign out</span>
            </Link>
          ) : (
            <Link className="header__nav-link" to={AppRoute.Login}>
              <span className="header__signout">Sign in</span>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
