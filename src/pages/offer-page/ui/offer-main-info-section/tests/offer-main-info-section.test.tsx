import { OfferMainInfoSection } from '../offer-main-info-section';
import { render } from '@testing-library/react';
import { ComponentProps } from 'react';
import { createFullOfferInfoMock } from '@test-utills/mock/offer';

vi.mock('../../near-offers-map', () => ({
  NearOffersMap: () => <p>Fake map</p>
}));

const createPropsMock = (): ComponentProps<typeof OfferMainInfoSection> => ({
  onFavoriteButtonClick: vi.fn()
});

describe('Component OfferMainInfoSection', () => {
  const offerInfoTestId = 'offer-info-section';
  const fakeMapText = 'Fake map';
  const fakeParagraphText = 'Fake children paragraph';

  it('should correct render without children and exists offer', async () => {
    vi.spyOn(await import('@pages/offer-page/lib/offer-page-data'), 'useOfferInfoData')
      .mockImplementation(vi.fn(() => createFullOfferInfoMock()));
    const { onFavoriteButtonClick } = createPropsMock();

    const screen = render(
      <OfferMainInfoSection onFavoriteButtonClick={onFavoriteButtonClick} />
    );

    expect(screen.getByTestId(offerInfoTestId)).toBeInTheDocument();
    expect(screen.getByText(fakeMapText)).toBeInTheDocument();
  });

  it('should correct render with children and exists offer', async () => {
    vi.spyOn(await import('@pages/offer-page/lib/offer-page-data'), 'useOfferInfoData')
      .mockImplementation(vi.fn(() => createFullOfferInfoMock()));
    const { onFavoriteButtonClick } = createPropsMock();

    const screen = render(
      <OfferMainInfoSection onFavoriteButtonClick={onFavoriteButtonClick}>
        <p>{fakeParagraphText}</p>
      </OfferMainInfoSection>
    );

    expect(screen.getByTestId(offerInfoTestId)).toBeInTheDocument();
    expect(screen.getByText(fakeMapText)).toBeInTheDocument();
    expect(screen.getByText(fakeParagraphText)).toBeInTheDocument();
  });

  it('should correct render where offer not exists', async () => {
    vi.spyOn(await import('@pages/offer-page/lib/offer-page-data'), 'useOfferInfoData')
      .mockImplementation(vi.fn(() => null));
    const { onFavoriteButtonClick } = createPropsMock();

    const screen = render(
      <OfferMainInfoSection onFavoriteButtonClick={onFavoriteButtonClick}>
        <p>{fakeParagraphText}</p>
      </OfferMainInfoSection>
    );

    expect(screen.container.childNodes.length).toBe(0);
  });
});

