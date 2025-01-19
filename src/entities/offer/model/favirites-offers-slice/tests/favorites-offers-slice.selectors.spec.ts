import { createMainOfferInfoMock } from '@test-utills/mock/offer';
import { favoritesOffersSelector, FavoriteOffersPickState } from '../selectors';

describe('Offer list selector', () => {
  it('should return correct value from state', () => {
    const state: FavoriteOffersPickState = {
      favoritesOffers: {
        error: null,
        offers: [createMainOfferInfoMock()]
      }
    };
    const expectedOffers = state.favoritesOffers.offers;

    const result = favoritesOffersSelector(state);

    expect(result).toEqual(expectedOffers);
  });
});
