import { render } from '@testing-library/react';
import { NearOffersMap } from '../near-offers-map';
import { withStore } from '@test-utills/hocs';
import { createMainOfferInfoMock } from '@test-utills/mock/offer';
import { LeafletPoint } from '@features/leaflet-map';

vi.mock('@shared/hooks/use-map');
vi.mock('leaflet');

describe('Component NearOffersMap', () => {
  const mapTestId = 'leaflet-map';

  it('should correct render', () => {
    const offerMock = createMainOfferInfoMock();
    const offerPoin: LeafletPoint = {
      location: {
        latitude: offerMock.location.latitude,
        longitude: offerMock.location.longitude,
        zoom: offerMock.location.zoom
      },
      name: offerMock.title
    };

    const { wrappedComponent } = withStore(
      <NearOffersMap mainOfferPoint={offerPoin} />,
      {
        fullScreanOffer: {
          comments: [],
          error: null,
          loading: false,
          nearOffers: [createMainOfferInfoMock()],
          offer: null
        }
      }
    );

    const screen = render(wrappedComponent);

    expect(screen.getByTestId(mapTestId)).toBeInTheDocument();
  });
});
