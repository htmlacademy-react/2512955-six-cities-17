import { createMemoryHistory, MemoryHistory } from 'history';
import { Header } from '../header';
import { withStore } from '@test-utills/hocs';
import { render } from '@testing-library/react';
import { AuthorizationStatusEnum } from '@shared/types';

describe('Component Header', () => {
  let history: MemoryHistory;
  const testParagraphText = 'Test children paragraph';

  beforeEach(() => {
    history = createMemoryHistory();
  });

  it('should correct render with show user navigation', () => {
    const { wrappedComponent } = withStore(
      <Header showUserNavigation><p>{testParagraphText}</p></Header>,
      {
        authorization: {
          status: AuthorizationStatusEnum.NoAuthorized,
          user: null,
          error: null,
        },
        favoritesOffers: {
          offers: [],
          error: null,
        }
      },
      [],
      history
    );

    const screen = render(wrappedComponent);

    expect(screen.container.querySelector('.header__nav')).not.toBeNull();
    expect(screen.getByText(testParagraphText)).toBeInTheDocument();
  });

  it('should correct render with hide user navigation', () => {
    const { wrappedComponent } = withStore(
      <Header showUserNavigation={false}><p>{testParagraphText}</p></Header>,
      {
        authorization: {
          status: AuthorizationStatusEnum.NoAuthorized,
          user: null,
          error: null,
        },
        favoritesOffers: {
          offers: [],
          error: null,
        }
      },
      [],
      history
    );

    const screen = render(wrappedComponent);

    expect(screen.container.querySelector('.header__nav')).toBeNull();
    expect(screen.getByText(testParagraphText)).toBeInTheDocument();
  });
});
