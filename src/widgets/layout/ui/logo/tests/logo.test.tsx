import { ElementSize, RoutesEnum } from '@shared/types';
import { Logo } from '../logo';
import { withRouter } from '@test-utills/hocs';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const LOGO_ALT = '6 cities logo';
const INITIAL_ROUTE = '/initial-route';
const FAKE_MAIN_PAGE_TEXT = 'Fake main page';
const DEFAULT_LOGO_TYPE = 'header';
const LOGO_SIZE: ElementSize = {
  height: 40,
  width: 80
};

const fakeMainPageElement = <p>{FAKE_MAIN_PAGE_TEXT}</p>;

describe('Component Logo', () => {
  const history = createMemoryHistory();

  beforeEach(() => {
    history.replace(INITIAL_ROUTE);
  });

  it('should correct render', () => {
    const component = withRouter(<Logo size={LOGO_SIZE} type={DEFAULT_LOGO_TYPE} />);

    const screen = render(component);

    expect(screen.getByAltText(LOGO_ALT)).toBeInTheDocument();
  });

  it('should redirect by MainPage if clicked', async () => {
    const component = withRouter(
      <Routes>
        <Route path={INITIAL_ROUTE} element={<Logo size={LOGO_SIZE} type={DEFAULT_LOGO_TYPE} />} />
        <Route path={RoutesEnum.Main} element={fakeMainPageElement} />
      </Routes>,
      history
    );

    const screen = render(component);
    await userEvent.click(screen.getByAltText(LOGO_ALT));

    expect(screen.getByText(FAKE_MAIN_PAGE_TEXT)).toBeInTheDocument();
  });
});
