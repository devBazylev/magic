import { ReactNode } from 'react';
import Logo from '../../components/logo/logo';

function Header({children}: { children?: ReactNode }): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          {children}
        </div>
      </div>
    </header>
  );
}

export default Header;
