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
        }
      },
      [],
      history
    );

    const screen = render(wrappedComponent);

    expect(screen.container.querySelector('.places__list')).not.toBeNull();
    expect(screen.container.querySelectorAll('.place-card').length).toBe(offersCount);
  });
});
