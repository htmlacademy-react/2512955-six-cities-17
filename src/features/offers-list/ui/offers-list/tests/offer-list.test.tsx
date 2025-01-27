import { AuthorizationStatusEnum } from '@shared/types';
import { OffersList } from '../offers-list';
import { withStore } from '@test-utills/hocs';
import { MemoryHistory, createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { ComponentProps } from 'react';
import { createMainOfferInfoMock } from '@test-utills/mock/offer';
import faker from 'faker';

const createPropsMock = (offersCount: number): ComponentProps<typeof OffersList> => ({
  offers: faker.datatype.array(offersCount).map(() => createMainOfferInfoMock()),
  onFavoriteClick: vi.fn(),
  onActivateOffer: vi.fn(),
});

describe('Component OfferList', () => {
  let history: MemoryHistory;
  const listContainerTestId = 'offer-list-container';
  const listItemTestId = 'offer-card-component';

  beforeEach(() => {
    history = createMemoryHistory();
  });

  it('should correct render', () => {
    const offersCount = 3;
    const { wrappedComponent } = withStore(
      <OffersList {...createPropsMock(offersCount)} />,
      {
        authorization: {
          error: null,
          status: AuthorizationStatusEnum.NoAuthorized,
          user: null,
          loading: false
        }
      },
      [],
      history
    );

    const screen = render(wrappedComponent);

    expect(screen.getByTestId(listContainerTestId)).not.toBeNull();
    expect(screen.queryAllByTestId(listItemTestId).length).toBe(offersCount);
  });
});
