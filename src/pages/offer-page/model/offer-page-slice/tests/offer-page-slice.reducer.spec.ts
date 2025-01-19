import { emptyAction } from '@test-utills/mock/redux';
import { addNewReviewAction, fetchOfferPageAction } from '../actions';
import { offerPageReducer, updateOffer } from '../offer-page-slice';
import { OfferPageState } from '../types';
import { createFullOfferInfoMock, createMainOfferInfoMock, createUnionOfferInfoMock } from '@test-utills/mock/offer';
import { unionToFullOfferInfoAdapter, unionToMainOfferInfoAdapter } from '@entities/offer';

describe('Offer page reducer', () => {
  let initialSliceState: OfferPageState;

  beforeEach(() => {
    initialSliceState = {
      comments: [],
      error: null,
      nearOffers: [],
      offer: null
    };
  });

  it('should return initial state with empty action', () => {
    const result = offerPageReducer(initialSliceState, emptyAction);

    expect(result).toEqual(initialSliceState);
  });

  it('should return initial state with empty action and undefined state', () => {
    const result = offerPageReducer(undefined, emptyAction);

    expect(result).toEqual(initialSliceState);
  });

  describe('should return correct state for "updateOffer" action', () => {
    it('is main offer update', () => {
      const unionOffer = createUnionOfferInfoMock();
      const adaptedOffer = unionToFullOfferInfoAdapter(unionOffer);
      initialSliceState.offer = {
        ...createFullOfferInfoMock(),
        id: adaptedOffer.id
      };

      const expectedState: OfferPageState = {
        comments: [],
        error: null,
        nearOffers: [],
        offer: adaptedOffer
      };

      const result = offerPageReducer(initialSliceState, updateOffer(unionOffer));

      expect(result).toEqual(expectedState);
    });

    it('is near offer update', () => {
      const unionOffer = createUnionOfferInfoMock();
      const adaptedOffer = unionToMainOfferInfoAdapter(unionOffer);
      initialSliceState.nearOffers = [{
        ...createMainOfferInfoMock(),
        id: adaptedOffer.id
      }];
      const expectedState: OfferPageState = {
        comments: [],
        error: null,
        nearOffers: [adaptedOffer],
        offer: null
      };

      const result = offerPageReducer(initialSliceState, updateOffer(unionOffer));

      expect(result).toEqual(expectedState);
    });

    it('is not find offer by update', () => {
      const unionOffer = createUnionOfferInfoMock();
      initialSliceState.offer = createFullOfferInfoMock();
      initialSliceState.nearOffers = [createMainOfferInfoMock()];

      const result = offerPageReducer(initialSliceState, updateOffer(unionOffer));

      expect(result).toEqual(initialSliceState);
    });
  });
});
