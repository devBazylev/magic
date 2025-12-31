import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function Logo(): JSX.Element {
  return(
    <Link className="btn header__logo" to={AppRoute.Root}>
      <img src='img/logo-@1x.png' srcSet='img/logo-@2x.png 2x' width={100} height={100} alt="Magic logo." />
    </Link>
  );
}

export default Logo;
