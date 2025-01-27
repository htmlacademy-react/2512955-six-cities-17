import { createFullOfferInfoMock } from '@test-utills/mock/offer';
import { OfferInfo } from '../offer-info';
import { render } from '@testing-library/react';
import { ComponentProps } from 'react';

const FAKE_MAP_TEXT = 'this is map!';

const createPropsMock = (): ComponentProps<typeof OfferInfo> => ({
  leafletMap: <p>{FAKE_MAP_TEXT}</p>,
  offer: createFullOfferInfoMock(),
  onFavoritesButtonClick: vi.fn()
});

describe('Component OfferInfo', () => {
  const favoriteButtonTextPattern = /^(to|in) bookmarks/i;
  const galleryTestId = 'image-gallery-container';
  const premiumMarkText = 'Premium';
  const insideTestId = 'offer-insides-list-item';
  const starsTestId = 'rating-star';
  const featuresTestId = 'offer-features-list-container';

  it('should correct render by not premium offer', () => {
    const { leafletMap, offer, onFavoritesButtonClick } = createPropsMock();
    offer.isPremium = false;
    const priceText = `€${offer.price}`;

    const screen = render(
      <OfferInfo
        leafletMap={leafletMap}
        offer={offer}
        onFavoritesButtonClick={onFavoritesButtonClick}
      />
    );

    expect(screen.getByTestId(galleryTestId)).toBeInTheDocument();
    expect(screen.getByText(offer.title)).toBeInTheDocument();
    expect(screen.getByText(favoriteButtonTextPattern)).toBeInTheDocument();
    expect(screen.getByText(offer.rating)).toBeInTheDocument();
    expect(screen.getByTestId(starsTestId)).toBeInTheDocument();
    expect(screen.getByTestId(featuresTestId)).toBeInTheDocument();
    expect(screen.getByText(priceText)).toBeInTheDocument();
    expect(screen.getByText(offer.description)).toBeInTheDocument();
    expect(screen.queryAllByTestId(insideTestId).length).toBe(offer.goods.length);
    expect(screen.getByText(FAKE_MAP_TEXT)).toBeInTheDocument();
    expect(screen.queryByText(premiumMarkText)).toBeNull();
  });

  it('should correct render by premium offer', () => {
    const { leafletMap, offer, onFavoritesButtonClick } = createPropsMock();
    offer.isPremium = true;
    const priceText = `€${offer.price}`;

    const screen = render(
      <OfferInfo
        leafletMap={leafletMap}
        offer={offer}
        onFavoritesButtonClick={onFavoritesButtonClick}
      />
    );

    expect(screen.getByTestId(galleryTestId)).toBeInTheDocument();
    expect(screen.getByText(offer.title)).toBeInTheDocument();
    expect(screen.getByText(favoriteButtonTextPattern)).toBeInTheDocument();
    expect(screen.getByText(offer.rating)).toBeInTheDocument();
    expect(screen.getByTestId(starsTestId)).toBeInTheDocument();
    expect(screen.getByTestId(featuresTestId)).toBeInTheDocument();
    expect(screen.getByText(priceText)).toBeInTheDocument();
    expect(screen.getByText(offer.description)).toBeInTheDocument();
    expect(screen.queryAllByTestId(insideTestId).length).toBe(offer.goods.length);
    expect(screen.getByText(FAKE_MAP_TEXT)).toBeInTheDocument();
    expect(screen.getByText(premiumMarkText)).toBeInTheDocument();
  });

  it('should correct render with children', () => {
    const { leafletMap, offer, onFavoritesButtonClick } = createPropsMock();
    offer.isPremium = true;
    const priceText = `€${offer.price}`;
    const childrenParagraphText = 'Children paragraph';

    const screen = render(
      <OfferInfo
        leafletMap={leafletMap}
        offer={offer}
        onFavoritesButtonClick={onFavoritesButtonClick}
      >
        {childrenParagraphText}
      </OfferInfo>
    );

    expect(screen.getByTestId(galleryTestId)).toBeInTheDocument();
    expect(screen.getByText(offer.title)).toBeInTheDocument();
    expect(screen.getByText(favoriteButtonTextPattern)).toBeInTheDocument();
    expect(screen.getByText(offer.rating)).toBeInTheDocument();
    expect(screen.getByTestId(starsTestId)).toBeInTheDocument();
    expect(screen.getByTestId(featuresTestId)).toBeInTheDocument();
    expect(screen.getByText(priceText)).toBeInTheDocument();
    expect(screen.getByText(offer.description)).toBeInTheDocument();
    expect(screen.queryAllByTestId(insideTestId).length).toBe(offer.goods.length);
    expect(screen.getByText(FAKE_MAP_TEXT)).toBeInTheDocument();
    expect(screen.getByText(premiumMarkText)).toBeInTheDocument();
    expect(screen.getByText(childrenParagraphText)).toBeInTheDocument();
  });
});
