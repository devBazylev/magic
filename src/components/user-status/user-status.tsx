import { Link } from 'react-router-dom';
import { AuthorizationStatus, AppRoute } from '../../const';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { logoutUser } from '../../store/action';
import { useCallback } from 'react';

function UserStatus({ activePage }: { activePage: AppRoute }): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const handleSignOutClick = useCallback(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(logoutUser());
    }
  }, [authorizationStatus, dispatch]);

  return (
    authorizationStatus === AuthorizationStatus.Auth ? (
      <button className={`btn header__tool ${activePage === AppRoute.Login ? 'header__tool--active' : ''}`} onClick={handleSignOutClick} type="button">
        <span className="header__signout">Sign out</span>
      </button>
    ) : (
      <Link className={`btn header__tool ${activePage === AppRoute.Login ? 'header__tool--active' : ''}`} to={AppRoute.Login}>
        <span className="header__signout">Sign in</span>
      </Link>
    )
  );
}

export default UserStatus;
// eslint-disable-next-line no-console
// eslint-disable-next-line react-hooks/exhaustive-deps
/* eslint-disable */
// @ts-ignore
