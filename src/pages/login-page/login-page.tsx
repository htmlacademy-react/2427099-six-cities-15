import { Helmet } from 'react-helmet-async';
import {useRef, FormEvent} from 'react';
import Container from '@components/container/container';
import { useAppDispatch } from '@hooks/index';
import { loginAction } from '@store/thunks/auth';
import { Link } from 'react-router-dom';
import { AppRoute, LOCATIONS } from '@const';
import { offersActions } from '@store/slices/offers';
import { getRandomLocation } from '@utils/common';

function LoginPage(): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();
  const randomLocation = getRandomLocation(LOCATIONS);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      dispatch(loginAction({
        email: loginRef.current.value,
        password: passwordRef.current.value
      }));
    }
  };

  return (
    <Container isLoginNav={false} extraClass='page--gray page--login' classMain='page__main--login'>
      <Helmet>
        <title>6 cities: authorization</title>
      </Helmet>
      <div className="page__login-container container">
        <section className="login" data-testid='login-section'>
          <h1 className="login__title">Sign in</h1>
          <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">E-mail</label>
              <input
                ref={loginRef}
                className="login__input form__input"
                type="email"
                name="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">Password</label>
              <input
                ref={passwordRef}
                className="login__input form__input"
                type="password"
                name="password"
                placeholder="Password"
                required
              />
            </div>
            <button
              className="login__submit form__submit button"
              type="submit"
            >
              Sign in
            </button>
          </form>
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <Link className="locations__item-link" to={AppRoute.Root} onClick={() => dispatch(offersActions.setLocation(randomLocation))}>
              <span>{randomLocation}</span>
            </Link>
          </div>
        </section>
      </div>
    </Container>
  );
}

export default LoginPage;
