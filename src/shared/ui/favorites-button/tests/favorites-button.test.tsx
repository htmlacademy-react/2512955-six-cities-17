import { ElementSize } from '@shared/types';
import { FavoritesButton } from '../favorites-button';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const ICON_SIZE_MOCK: ElementSize = {
  width: 10,
  height: 10,
};
const BUTTON_CSS_SELECTOR = 'button__selector';
const ICON_CSS_SELECTOR = 'icon__selector';

describe('Component FavoritesButton', () => {
  const buttonTestId = 'favorite-button';

  it('should correct render by \'isFavorite=true\'', () => {
    const iconText = /^in bookmarks/i;
    const screen = render(
      <FavoritesButton
        buttonClassName={BUTTON_CSS_SELECTOR}
        iconClassName={ICON_CSS_SELECTOR}
        iconSize={ICON_SIZE_MOCK}
        isFavorite
      />
    );

    expect(screen.getByText(iconText)).toBeInTheDocument();
    expect(screen.getByTestId(buttonTestId)).toBeInTheDocument();
  });

  it('should correct render by \'isFavorite=false\'', () => {
    const iconText = /^to bookmarks/i;
    const screen = render(
      <FavoritesButton
        buttonClassName={BUTTON_CSS_SELECTOR}
        iconClassName={ICON_CSS_SELECTOR}
        iconSize={ICON_SIZE_MOCK}
        isFavorite={false}
      />
    );

    expect(screen.getByText(iconText)).toBeInTheDocument();
    expect(screen.getByTestId(buttonTestId)).toBeInTheDocument();
  });

  it('should call \'onFavoriteClick\' callback if clicked', async () => {
    const onFavoriteClickMock = vi.fn();

    const screen = render(
      <FavoritesButton
        buttonClassName={BUTTON_CSS_SELECTOR}
        iconClassName={ICON_CSS_SELECTOR}
        iconSize={ICON_SIZE_MOCK}
        isFavorite={false}
        onFavoritesClick={onFavoriteClickMock}
      />
    );

    await userEvent.click(screen.getByTestId(buttonTestId));

    expect(onFavoriteClickMock).toBeCalledTimes(1);
  });
});
