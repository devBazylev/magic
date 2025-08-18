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
          <h1 className="login__title">Sign in</h1>
          <form className="login__form" action="#" method="post" onSubmit={handleFormSubmit}>
            <label className="login__label btn" key="email" htmlFor="email">
              <span className="visually-hidden">email</span>
              <input
                className="login__input"
                type="email"
                name="email"
                placeholder="Email"
                required
              />
            </label>
            <label className="login__label btn" key="password" htmlFor="password">
              <span className="visually-hidden">password</span>
              <input
                className="login__input"
                type="password"
                name="password"
                placeholder="Password"
                required
              />
            </label>
            <button
              className="login__submit btn"
              type="submit"
            >
              Sign in
            </button>
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
