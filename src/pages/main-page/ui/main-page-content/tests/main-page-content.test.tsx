import { MainOfferInfo, OfferCityName } from '@entities/offer';
import { OfferSortType } from '@features/offer-sorting-select';
import { createMainOfferInfoMock } from '@test-utills/mock/offer';
import { render } from '@testing-library/react';
import faker from 'faker';
import { ReactNode } from 'react';
import { MainPageContent } from '../main-page-content';
import { withStore } from '@test-utills/hocs';
import { AuthorizationStatusEnum } from '@shared/types';
import { createUserMock } from '@test-utills/mock/user';

vi.mock('react-router-dom');

const activeLocation: OfferCityName = 'Dusseldorf';
const activeSortType = OfferSortType.DecreasePrice;
const offersCount = 3;
const tabSectionText = 'Fake tab section';
const tabSectionMock: ReactNode = <p>{tabSectionText}</p>;

const createOffersMock = (): MainOfferInfo[] =>
  faker.datatype.array(offersCount).map(() => {
    const offerMock = createMainOfferInfoMock();
    offerMock.city.name = activeLocation;
    return offerMock;
  });

describe('Component MainPageContent', () => {
  const mapTestId = 'leaflet-map';

  it('should correct render if exists offers', () => {
    const { wrappedComponent } = withStore(
      <MainPageContent activeCitySearchParam={activeLocation} tabSection={tabSectionMock} />,
      {
        authorization: {
          error: null,
          status: AuthorizationStatusEnum.Authorized,
          user: createUserMock(),
          loading: false,
        },
        offersList: {
          error: null,
          offers: createOffersMock(),
          loading: false,
        },
        activeLocation: {
          location: activeLocation
        },
        activeSorting: {
          priceSorting: activeSortType
        },
        loading: {
          loading: false
        }
      }
    );

    const screen = render(wrappedComponent);

    expect(screen.getByText('Cities')).toBeInTheDocument();
    expect(screen.getByText(tabSectionText)).toBeInTheDocument();
    expect(screen.getByText(`${offersCount} places to stay in ${activeLocation}`)).toBeInTheDocument();
    expect(screen.getByText('Places')).toBeInTheDocument();
    expect(screen.getByTestId(mapTestId)).toBeInTheDocument();
  });
});
