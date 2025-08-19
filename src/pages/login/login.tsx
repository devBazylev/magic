import Header from '../../components/header/header';
import Modal from '../../components/modal/modal';
import Overlay from '../../components/overlay/overlay';
import Back from '../../components/back/back';
import type { UserAuth } from '../../types';
import { HelmetProvider } from 'react-helmet-async';
import { BackPath } from '../../const';
import { FormEvent, useRef, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { loginUser } from '../../store/action';

function Login(): JSX.Element {
  const [isSignIn, setIsSignIn] = useState(true);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();

  const handleButtonClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    if (formRef.current) {
      formRef.current.classList.add('login__form--check');
    }
    if (evt.currentTarget.classList.contains('login__submit--signin')) {
      setIsSignIn(true);
    } else if (evt.currentTarget.classList.contains('login__submit--signup')) {
      setIsSignIn(false);
    }
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    const form = formRef.current;
    if (form) {
      evt.preventDefault();
      const formData = new FormData(form);
      const data = Object.fromEntries(formData) as UserAuth;
      if (isSignIn) {
        dispatch(loginUser(data));
      } else {
        // dispatch(registerUser(data));
      }

      // eslint-disable-next-line no-console
      console.log('Form submitted!');
      formRef.current.classList.remove('login__form--check');
    }
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
          <form className="login__form" action="#" method="post" onSubmit={handleFormSubmit} ref={formRef}>
            <input className="login__input" type="email" name="email" id="email" minLength={5} maxLength={40} autoComplete="email" placeholder="Type test@test.com or sign up yourself" required />
            <label className="login__label" key="email" htmlFor="email">Email</label>
            <input className="login__input" type="password" name="password" id="password" minLength={3} maxLength={40} autoComplete="current-password" placeholder="Type 123 or sign up yourself" required />
            <label className="login__label" key="password" htmlFor="password">Password</label>
            <button className="login__submit login__submit--signin btn" type="submit" onClick={handleButtonClick}>Sign in</button>
            <button className="login__submit login__submit--signup btn" type="submit" onClick={handleButtonClick}>Sign up</button>
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
