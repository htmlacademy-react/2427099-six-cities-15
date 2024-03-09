import { Location, Navigate, useLocation } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { setAuthorizationStatus } from '../../utils/common';

type TProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: JSX.Element;
}

type TLocationState = {
  from?: Location;
}

function ProtectedRoute(props: TProtectedRouteProps): JSX.Element {
  const {onlyUnAuth, children} = props;
  const location: Location<TLocationState> = useLocation() as Location<TLocationState>;

  const isAuthorizationStatus = setAuthorizationStatus(AuthorizationStatus.Auth);

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
