import { emptyAction } from '@test-utills/mock/redux';
import { addNewReviewAction, fetchOfferPageAction } from '../actions';
import { offerPageReducer, updateOffer } from '../offer-page-slice';
import { OfferPageState } from '../types';
import {
  createFullOfferInfoMock,
  createMainOfferInfoMock,
  createUnionOfferInfoMock,
} from '@test-utills/mock/offer';
import { unionToFullOfferInfoAdapter, unionToMainOfferInfoAdapter } from '@entities/offer';
import { createHttpErrorMock } from '@test-utills/mock/http-error-mock';
import {
  createReviewMock,
  createNewReviewDataMock,
  creatNewReviewMock,
} from '@test-utills/mock/review';
import faker from 'faker';

describe('Offer page reducer', () => {
  let initialSliceState: OfferPageState;

  beforeEach(() => {
    initialSliceState = {
      comments: [],
      error: null,
      nearOffers: [],
      offer: null,
      loading: false
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
        offer: adaptedOffer,
        loading: false
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
        offer: null,
        loading: false,
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

  it('should return correct state by "fetchOfferPageAction.pending"', () => {
    const errorMock = createHttpErrorMock(500);
    initialSliceState.error = {
      code: errorMock.code,
      message: errorMock.message
    };

    const expectedState: OfferPageState = {
      comments: [],
      error: null,
      nearOffers: [],
      offer: null,
      loading: true
    };

    const result = offerPageReducer(initialSliceState, fetchOfferPageAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should return correct state by "fetchOfferPageAction.fullfilled"', () => {
    const reviewMock = createReviewMock();
    const nearOfferMock = createMainOfferInfoMock();
    const offer = createFullOfferInfoMock();

    const expectedState: OfferPageState = {
      comments: [reviewMock],
      error: null,
      nearOffers: [nearOfferMock],
      offer: offer,
      loading: false
    };

    const actionPayload = structuredClone(expectedState);

    const result = offerPageReducer(initialSliceState, fetchOfferPageAction.fulfilled(actionPayload, '', ''));

    expect(result).toEqual(expectedState);
  });

  it('should return correct state by "fetchOfferPageAction.rejected"', () => {
    const errorMock = createHttpErrorMock(404);

    const expectedState: OfferPageState = {
      comments: [],
      error: {
        code: errorMock.code,
        message: errorMock.message
      },
      nearOffers: [],
      offer: null,
      loading: false
    };

    const result = offerPageReducer(initialSliceState, fetchOfferPageAction.rejected(errorMock, '', ''));

    expect(result).toEqual(expectedState);
  });

  it('should return correct state by "addNewReview.pending" action', () => {
    const { code, message } = createHttpErrorMock(401);
    initialSliceState.error = {
      code,
      message
    };
    const expectedState: OfferPageState = {
      comments: [],
      error: null,
      nearOffers: [],
      offer: null,
      loading: true
    };

    const result = offerPageReducer(initialSliceState, addNewReviewAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should return correct state by "addNewReview.fullfilled" action', () => {
    const reviewMock = createReviewMock();
    const expectedState: OfferPageState = {
      comments: [reviewMock],
      error: null,
      nearOffers: [],
      offer: null,
      loading: false
    };

    const result = offerPageReducer(initialSliceState, addNewReviewAction.fulfilled(reviewMock, '', { offerId: faker.datatype.uuid(), reviewData: createNewReviewDataMock() }));

    expect(result).toEqual(expectedState);
  });

  it('should return correct state by "addNewReview.rejected" action', () => {
    const newReviewDataMock = createNewReviewDataMock();
    const newReviewMock = creatNewReviewMock(newReviewDataMock);
    const expectedState: OfferPageState = {
      comments: [newReviewMock],
      error: null,
      nearOffers: [],
      offer: null,
      loading: false
    };

    const result = offerPageReducer(initialSliceState, addNewReviewAction.fulfilled(newReviewMock, '', {
      offerId: faker.datatype.uuid(),
      reviewData: newReviewDataMock
    }));

    expect(result).toEqual(expectedState);
  });
});
