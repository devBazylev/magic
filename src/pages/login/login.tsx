import type { UserAuth } from '../../types';
import Header from '../../components/header/header';
import Modal from '../../components/modal/modal';
import { MemoizedOverlay } from '../../components/overlay/overlay';
import Back from '../../components/back/back';
import { Helmet } from 'react-helmet-async';
import { BackPath } from '../../const';
import { FormEvent, useCallback, useRef, useState, memo } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginUser, registerUser } from '../../store/action';
import { getUserError } from '../../store/user-process/selectors';
import { clearError } from '../../store/user-process/user-process';

function Login(): JSX.Element {
  const [isSignIn, setIsSignIn] = useState(true);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();
  const error = useAppSelector(getUserError);

  const handleSignInButton = useCallback(() => {
    if (formRef.current) {
      formRef.current.classList.add('login__form--check');
    }
    setIsSignIn(true);
    if (error) {
      dispatch(clearError());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSignUpButton = useCallback(() => {
    if (formRef.current) {
      formRef.current.classList.add('login__form--check');
    }
    setIsSignIn(false);
    if (error) {
      dispatch(clearError());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFormSubmit = useCallback((evt: FormEvent<HTMLFormElement>) => {
    const form = formRef.current;
    if (form) {
      evt.preventDefault();
      const formData = new FormData(form);
      const data = Object.fromEntries(formData) as UserAuth;
      if (isSignIn) {
        dispatch(loginUser(data));
      } else {
        dispatch(registerUser(data));
      }
      formRef.current.classList.remove('login__form--check');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignIn]);

  return (
    <div className="wrapper">
      <Helmet>
        <title>Authorization</title>
      </Helmet>
      <Header headerRef={headerRef} />
      <main>
        <section className="login">
          <h1 className="login__title">Login</h1>
          <form className="login__form" action="#" method="post" onSubmit={handleFormSubmit} ref={formRef}>
            <div className={`login__error ${error ? 'login__error--visible' : ''}`}>{error}</div>
            <input className="login__input" type="email" name="email" id="email" minLength={5} maxLength={40} autoComplete="email" placeholder="Type test@test.com or sign up" required />
            <label className="login__label" key="email" htmlFor="email">Email</label>
            <input className="login__input" type="password" name="password" id="password" minLength={3} maxLength={40} autoComplete="current-password" placeholder="Type 123 or sign up" required />
            <label className="login__label" key="password" htmlFor="password">Password</label>
            <button className="login__submit login__submit--signin btn" type="submit" onClick={handleSignInButton}>Sign in</button>
            <button className="login__submit login__submit--signup btn" type="submit" onClick={handleSignUpButton}>Sign up</button>
          </form>
        </section>
        <Modal headerRef={headerRef} />
      </main>
      <Back path={BackPath.Login}/>
      <MemoizedOverlay />
    </div>
  );
}

export const MemoizedLogin = memo(Login);
