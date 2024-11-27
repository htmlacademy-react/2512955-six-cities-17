import { Navigate } from 'react-router-dom';
import { useAuthorization } from '@entities/user/lib/useAuthorization';
import type { PropsWithChildren } from 'react';

type NoAuthRouteProps = PropsWithChildren<{
  redirectPath: string;
}>

export function NoAuthRoute({ redirectPath, children }: NoAuthRouteProps): JSX.Element {
  const { isAuthorized } = useAuthorization();
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {!isAuthorized
        ? children
        : <Navigate to={redirectPath} replace />}
    </>
  );
}
