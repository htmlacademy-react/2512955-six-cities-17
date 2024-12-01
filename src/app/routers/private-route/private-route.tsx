import { Navigate } from 'react-router-dom';
import type { PropsWithChildren } from 'react';

type PrivateRouteProps = PropsWithChildren<{
  redirectPath: string;
  isPrivate: boolean;
}>

export function PrivateRoute({ redirectPath, children, isPrivate }: PrivateRouteProps): JSX.Element {
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isPrivate
        ? children
        : <Navigate to={redirectPath} replace />}
    </>
  );
}
