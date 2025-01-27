import { createMainOfferInfoMock } from '@test-utills/mock/offer';
import { favoritesOffersSelector, FavoriteOffersPickState, favoritesLoadingSelector } from '../selectors';

describe('Offer list selectors', () => {
  describe('offer selector', () => {
    it('should return correct value from state', () => {
      const state: FavoriteOffersPickState = {
        favoritesOffers: {
          error: null,
          offers: [createMainOfferInfoMock()],
          loading: false
        }
      };
      const expectedOffers = state.favoritesOffers.offers;

      const result = favoritesOffersSelector(state);

      expect(result).toEqual(expectedOffers);
    });
  });

  describe('offer loading selector', () => {
    it('should return correct value from state', () => {
      const state: FavoriteOffersPickState = {
        favoritesOffers: {
          error: null,
          offers: [createMainOfferInfoMock()],
          loading: false
        }
      };
      const expectedLoading = state.favoritesOffers.loading;

      const result = favoritesLoadingSelector(state);

      expect(result).toEqual(expectedLoading);
    });
  });
});
