import { OfferCityName } from '@entities/offer';
import { MainPageCities } from '../main-page-cities';
import { withStore } from '@test-utills/hocs';
import { createOffersMockByLocation } from '@test-utills/mock/offer';
import { createUserMock } from '@test-utills/mock/user';
import { OfferSortType } from '@features/offer-sorting-select';
import { AuthorizationStatusEnum } from '@shared/types';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';


describe('Component MainPageCities', () => {
  const offersCount = 3;
  const activeLocation: OfferCityName = 'Hamburg';
  const citiesHeaderText = `${offersCount} places to stay in ${activeLocation}`;
  const offerCardTestId = 'offer-card-component';
  const mapTestId = 'leaflet-map';

  it('should correct render by offers exists', () => {
    const offersMock = createOffersMockByLocation(activeLocation, offersCount);
    const { wrappedComponent } = withStore(
      <MainPageCities activeLocation={activeLocation} offers={offersMock} />,
      {
        authorization: {
          error: null,
          status: AuthorizationStatusEnum.Authorized,
          user: createUserMock()
        },
        offersList: {
          error: null,
          offers: offersMock
        },
        activeLocation: {
          location: activeLocation
        },
        activeSorting: {
          priceSorting: OfferSortType.DecreasePrice
        },
        loading: {
          loading: false
        }
      },
      [],
      createMemoryHistory()
    );

    const screen = render(wrappedComponent);

    expect(screen.getByText(/^places/i)).toBeInTheDocument();
    expect(screen.getByText(citiesHeaderText)).toBeInTheDocument();
    expect(screen.getByText(/^sort by*/i)).toBeInTheDocument();
    expect(screen.getAllByTestId(offerCardTestId).length).toBe(offersCount);
    expect(screen.getByTestId(mapTestId)).toBeInTheDocument();
  });

  it('should correct render by offers not exists', () => {
    const noPlacesText = `We could not find any property available at the moment in ${activeLocation}`;
    const { wrappedComponent } = withStore(
      <MainPageCities activeLocation={activeLocation} offers={[]} />,
      {
        authorization: {
          error: null,
          status: AuthorizationStatusEnum.Authorized,
          user: createUserMock()
        },
        offersList: {
          error: null,
          offers: []
        },
        activeLocation: {
          location: activeLocation
        },
        activeSorting: {
          priceSorting: OfferSortType.DecreasePrice
        },
        loading: {
          loading: false
        }
      },
      [],
      createMemoryHistory()
    );

    const screen = render(wrappedComponent);

    expect(screen.queryByText(/^places/i)).toBeNull();
    expect(screen.queryByText(citiesHeaderText)).toBeNull();
    expect(screen.getByText(noPlacesText)).toBeInTheDocument();
    expect(screen.queryAllByTestId(offerCardTestId).length).toBe(0);
    expect(screen.queryByTestId(mapTestId)).toBeNull();
  });
});
