import { HistoryRouter } from '@shared/ui/history-router';
import { createMemoryHistory, MemoryHistory } from 'history';
import { withHelmet } from './withHelmet';

export const withRouter = (component: JSX.Element, history?: MemoryHistory): JSX.Element => {
  const memoryHistory = history ?? createMemoryHistory();

  return withHelmet(
    <HistoryRouter history={memoryHistory}>
      {component}
    </HistoryRouter>
  );
};
