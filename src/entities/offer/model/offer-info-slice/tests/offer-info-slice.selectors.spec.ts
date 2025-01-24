import { createMainOfferInfoMock } from '@test-utills/mock/offer';
import { offersListSelector, OfferListPickState } from '../selectors';

describe('Offer list selector', () => {
  it('should return correct value from state', () => {
    const state: OfferListPickState = {
      offersList: {
        error: null,
        offers: [createMainOfferInfoMock()]
      }
    };
    const expectedOffers = state.offersList.offers;

    const result = offersListSelector(state);

    expect(result).toEqual(expectedOffers);
  });
});
