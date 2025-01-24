import { HistoryRouter, browserHistory } from '@shared/ui/history-router';
import { useAuthorization } from '@entities/user';
import { AppRoutes } from './app-routes';

export function RouterProvider(): JSX.Element {
  const { authorizationStatus } = useAuthorization();
  return (
    <HistoryRouter history={browserHistory}>
      <AppRoutes authorizationStatus={authorizationStatus} />
    </HistoryRouter>
  );
}
