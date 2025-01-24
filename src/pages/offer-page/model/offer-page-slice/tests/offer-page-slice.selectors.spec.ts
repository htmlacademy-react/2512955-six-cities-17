import { createReviewMock } from '@test-utills/mock/review';
import {
  offerDataSelector,
  offerNearsSelector,
  offerReviewsSelector,
  SliceState
} from '../selectors';
import { createFullOfferInfoMock, createMainOfferInfoMock } from '@test-utills/mock/offer';

describe('Offer page slice selectors', () => {
  const state: SliceState = {
    fullScreanOffer: {
      comments: [createReviewMock()],
      nearOffers: [createMainOfferInfoMock()],
      offer: createFullOfferInfoMock(),
      error: null
    }
  };

  describe('Offer data selector', () => {
    it('should return correct state', () => {
      const result = offerDataSelector(state);

      expect(result).toEqual(state.fullScreanOffer.offer);
    });
  });

  describe('Offer reviews selector', () => {
    it('should return correct state', () => {
      const result = offerReviewsSelector(state);

      expect(result).toEqual(state.fullScreanOffer.comments);
    });
  });

  describe('Near offers selector', () => {
    it('should return correct state', () => {
      const result = offerNearsSelector(state);

      expect(result).toEqual(state.fullScreanOffer.nearOffers);
    });
  });
});
