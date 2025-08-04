import { Link } from 'react-router-dom';
import { AuthorizationStatus, AppRoute } from '../../const';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { logoutUser } from '../../store/action';

function UserStatus(): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const handleSignOutClick = () => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(logoutUser());
    }
  };

  return (
    authorizationStatus === AuthorizationStatus.Auth ? (
      <Link className="btn header__tool" onClick={handleSignOutClick} to={AppRoute.Root}>
        <span className="header__signout">Sign out</span>
      </Link>
    ) : (
      <Link className="btn header__tool" to={AppRoute.Login}>
        <span className="header__signout">Sign in</span>
      </Link>
    )
  );
}

export default UserStatus;
