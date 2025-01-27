import { withRouter } from '@test-utills/hocs';
import { LocationLink } from '../location-link';
import { render } from '@testing-library/react';
import { OfferCityName } from '@entities/offer';
import { createMemoryHistory } from 'history';
import { RoutesEnum } from '@shared/types';
import { Route, Routes } from 'react-router-dom';
import { userEvent } from '@testing-library/user-event';

describe('Component LocationLink', () => {
  const offerCityName: OfferCityName = 'Amsterdam';
  const mainPageMockText = `Offers by ${offerCityName}`;
  const loginPageMockText = 'Logn page';

  it('should correct render', async () => {
    vi.spyOn(await import('../get-city-name'), 'getCityName')
      .mockImplementation(vi.fn(() => offerCityName));
    const component = withRouter(<LocationLink />);

    const screen = render(component);

    expect(screen.getByText(offerCityName)).toBeInTheDocument();
  });

  it('should correct navigate', async () => {
    const history = createMemoryHistory();
    history.replace(RoutesEnum.Login);
    vi.spyOn(await import('../get-city-name'), 'getCityName')
      .mockImplementation(vi.fn(() => offerCityName));
    const mainPageMockComponent = <p>{mainPageMockText}</p>;
    const component = withRouter(
      <Routes>
        <Route
          path={RoutesEnum.Login}
          element={
            <>
              <p>{loginPageMockText}</p>
              <LocationLink />
            </>
          }
        />
        <Route path={RoutesEnum.Main} element={mainPageMockComponent} />
      </Routes>,
      history
    );
    const screen = render(component);
    await userEvent.click(screen.getByText(offerCityName));

    expect(screen.getByText(mainPageMockText)).toBeInTheDocument();
    expect(screen.queryByText(loginPageMockText)).toBeNull();
  });
});
