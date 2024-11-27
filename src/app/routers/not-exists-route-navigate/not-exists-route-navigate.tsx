import { useAuthorization } from '@entities/user';
import { Navigate } from 'react-router-dom';

type NotExistsRouteNavigateProps = {
  authRedirect: string;
  noAuthRedirect: string;
};

export function NotExistsRouteNavigate({authRedirect, noAuthRedirect}: NotExistsRouteNavigateProps): JSX.Element {
  const { isAuthorized } = useAuthorization();
  return (
    <Navigate to={isAuthorized ? authRedirect : noAuthRedirect} replace />
  );
}
