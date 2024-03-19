import { NavLink } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '@const';
import Logo from '../logo/logo';
import { useAppSelector } from '@hooks/index';
import { authSelectors } from '@store/slices/auth';

type THeaderProps = {
  isLoginNav: boolean;
}

function Header({ isLoginNav }: THeaderProps): JSX.Element {
  const authorizationStatus = useAppSelector(authSelectors.selectAuthorizationStatus);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          {isLoginNav && (
            <nav className="header__nav">
              <ul className="header__nav-list">
                {authorizationStatus === AuthorizationStatus.Auth ?
                  <>
                    <li className="header__nav-item user">
                      <NavLink className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                        <div className="header__avatar-wrapper user__avatar-wrapper">
                        </div>
                        <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                        <span className="header__favorite-count">3</span>
                      </NavLink>
                    </li>
                    <li className="header__nav-item">
                      <a className="header__nav-link" href="#">
                        <span className="header__signout">Sign out</span>
                      </a>
                    </li>
                  </> :
                  <li className="header__nav-item user">
                    <NavLink className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__login">Sign in</span>
                    </NavLink>
                  </li>}
              </ul>
            </nav>)}
        </div>
      </div>
    </header>
  );
}

export default Header;
