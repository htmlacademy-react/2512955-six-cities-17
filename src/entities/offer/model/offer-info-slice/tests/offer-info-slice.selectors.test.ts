import { createMainOfferInfoMock } from '@test-utills/mock/offer';
import { offersListSelector, OfferListPickState, offersLoadingSelector } from '../selectors';

describe('Offer list selectors', () => {
  describe('offer selector', () => {
    it('should return correct value from state', () => {
      const state: OfferListPickState = {
        offersList: {
          error: null,
          offers: [createMainOfferInfoMock()],
          loading: false
        }
      };
      const expectedOffers = state.offersList.offers;

      const result = offersListSelector(state);

      expect(result).toEqual(expectedOffers);
    });
  });

  describe('offer loading selector', () => {
    it('should return correct value from state', () => {
      const state: OfferListPickState = {
        offersList: {
          error: null,
          offers: [createMainOfferInfoMock()],
          loading: false
        }
      };

      const expectedLoading = state.offersList.loading;

      const result = offersLoadingSelector(state);

      expect(result).toEqual(expectedLoading);
    });
  });
});
