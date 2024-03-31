import { Helmet } from 'react-helmet-async';
import { FormEvent, useState, ReactEventHandler, useMemo } from 'react';
import Container from '@components/container/container';
import { useAppDispatch } from '@hooks/index';
import { loginAction } from '@store/thunks/auth';
import { Link } from 'react-router-dom';
import { AppRoute, LOCATIONS } from '@const';
import { offersActions } from '@store/slices/offers';
import { getRandomLocation } from '@utils/common';

type THTMLLoginForm = HTMLFormElement & {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

type TLoginData = {
  email: string;
  password: string;
}

type TChangeHandler = ReactEventHandler<HTMLInputElement>;

function LoginPage(): JSX.Element {
  const [loginData, setLoginData] = useState<TLoginData>({
    email: '',
    password: ''
  });

  const dispatch = useAppDispatch();
  const randomLocation = useMemo(() => getRandomLocation(LOCATIONS), []);

  const handleChange: TChangeHandler = (evt) => {
    const { name, value } = evt.currentTarget;

    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleSubmit = (evt: FormEvent<THTMLLoginForm>) => {
    evt.preventDefault();

    dispatch(loginAction(loginData));
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
                value={loginData.email}
                className="login__input form__input"
                type="email"
                name="email"
                placeholder="Email"
                required
                onChange={handleChange}
              />
            </div>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">Password</label>
              <input
                value={loginData.password}
                className="login__input form__input"
                type="password"
                name="password"
                placeholder="Password"
                required
                onChange={handleChange}
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
