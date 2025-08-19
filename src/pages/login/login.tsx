import Header from '../../components/header/header';
import Modal from '../../components/modal/modal';
import Overlay from '../../components/overlay/overlay';
import { HelmetProvider } from 'react-helmet-async';
import type { FormEvent } from 'react';
import type { UserAuth } from '../../types';
import { useAppDispatch } from '../../hooks';
import { loginUser } from '../../store/action';
import { BackPath } from '../../const';
import Back from '../../components/back/back';
import { useRef } from 'react';

function Login(): JSX.Element {
  const dispatch = useAppDispatch();
  const headerRef = useRef<HTMLHeadingElement>(null);

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData) as UserAuth;
    dispatch(loginUser(data));
  };

  return (
    <div className="wrapper">
      <HelmetProvider>
        <title>Authorization page</title>
      </HelmetProvider>
      <Header headerRef={headerRef} />
      <main>
        <section className="login">
          <h1 className="login__title">Login</h1>
          <form className="login__form" action="#" method="post" onSubmit={handleFormSubmit}>
            <input className="login__input" type="text" name="email" id="email" minLength={5} maxLength={40} title="Lenght 5 - 40 symbols" autoComplete="email" required />
            <label className="login__label" key="email" htmlFor="email">Email</label>
            <input className="login__input" type="password" name="password" id="password" minLength={3} maxLength={40} title="Lenght 3 - 40 symbols" autoComplete="password" required />
            <label className="login__label" key="password" htmlFor="password">Password</label>
            <button className="login__submit btn" type="submit">Sign in</button>
          </form>
        </section>
        <Modal headerRef={headerRef} />
      </main>
      <Back path={BackPath.Login}/>
      <Overlay />
    </div>
  );
}

export default Login;
