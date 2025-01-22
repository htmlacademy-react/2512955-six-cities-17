import { HistoryRouter } from '@shared/ui/history-router';
import { createMemoryHistory, MemoryHistory } from 'history';
import { HelmetProvider } from 'react-helmet-async';

export const withRouter = (component: JSX.Element, history?: MemoryHistory): JSX.Element => {
  const memoryHistory = history ?? createMemoryHistory();
  return (
    <HelmetProvider>
      <HistoryRouter history={memoryHistory}>
        {component}
      </HistoryRouter>
    </HelmetProvider>
  );
};
