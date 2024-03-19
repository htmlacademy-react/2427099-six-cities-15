import { Location, Navigate, useLocation } from 'react-router-dom';
import { AppRoute } from '@const';
import { setAuthorizationStatus } from '@utils/common';
import { useAppSelector } from '@hooks/index';
import { authSelectors } from '@store/slices/auth';

type TProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: JSX.Element;
}

type TLocationState = {
  from?: Location;
}

function ProtectedRoute(props: TProtectedRouteProps): JSX.Element {
  const {onlyUnAuth, children} = props;
  const authorizationStatus = useAppSelector(authSelectors.selectAuthorizationStatus);
  const location: Location<TLocationState> = useLocation() as Location<TLocationState>;

  const isAuthorizationStatus = setAuthorizationStatus(authorizationStatus);

  if (isAuthorizationStatus && onlyUnAuth) {
    const from = location.state?.from || { pathname: AppRoute.Root };
    return <Navigate to={from} />;
  }

  if (!isAuthorizationStatus && !onlyUnAuth) {
    return <Navigate to={AppRoute.Login} state={{ from: location }}/>;
  }

  return children;
}

export default ProtectedRoute;
