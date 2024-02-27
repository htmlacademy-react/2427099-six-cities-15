import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';

type TProtectedRouteProps = {
  children: JSX.Element;
  authorizationStatus: AuthorizationStatus;
}

function ProtectedRoute(props: TProtectedRouteProps): JSX.Element {
  const {authorizationStatus, children} = props;

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}

export default ProtectedRoute;
