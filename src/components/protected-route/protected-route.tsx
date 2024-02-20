import { Navigate } from 'react-router-dom';

type TProtectedRouteProps = {
  children: JSX.Element;
  hasAccess: boolean;
}

export default function ProtectedRoute({ children, hasAccess }: TProtectedRouteProps): JSX.Element {
  if (hasAccess) {
    return children;
  }

  return <Navigate to='/login' />;
}
