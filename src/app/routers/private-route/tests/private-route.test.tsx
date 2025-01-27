import { render } from '@testing-library/react';
import { PrivateRoute } from '../private-route';
import { withRouter } from '@test-utills/hocs';
import { createMemoryHistory } from 'history';

const PRIVATE_SECTION_TEXT = 'Private section';
const INIT_ROUTE = '/init-route';
const REDIRECTED_ROUTE = '/redirect-route';

const PrivateComponentMock = (): JSX.Element => <p>{PRIVATE_SECTION_TEXT}</p>;

describe('Component PrivateRoute', () => {
  const history = createMemoryHistory();

  beforeEach(() => {
    history.replace(INIT_ROUTE);
  });

  it('should correct render by part accessed', () => {
    const component = withRouter(
      <PrivateRoute isPrivate redirectPath={REDIRECTED_ROUTE}>
        <PrivateComponentMock />
      </PrivateRoute>,
      history
    );

    const screen = render(component);

    expect(screen.getByText(PRIVATE_SECTION_TEXT)).toBeInTheDocument();
    expect(history.location.pathname).toBe(INIT_ROUTE);
  });

  it('should navigate by part denied', () => {
    const component = withRouter(
      <PrivateRoute isPrivate={false} redirectPath={REDIRECTED_ROUTE}>
        <PrivateComponentMock />
      </PrivateRoute>,
      history
    );

    const screen = render(component);

    expect(screen.container.childNodes.length).toBe(0);
    expect(history.location.pathname).toBe(REDIRECTED_ROUTE);
  });
});
