import {
  offersListReducer,
  updateOffer
} from '../offers-info-slice';
import { emptyAction } from '@test-utills/mock/redux';
import { MainOfferInfo, OfferListState } from '../../types';
import { STATE_TEMPLATE } from '@entities/offer/config/const';
import { createMainOfferInfoMock, createUnionOfferInfoMock } from '@test-utills/mock/offer';
import * as adapters from '../../../lib/adapters/union-offer-info-adapters';
import { beforeEach } from 'vitest';
import { fetchOffersList } from '../actions';
import { createHttpErrorMock } from '@test-utills/mock/http-error-mock';

describe('Offers list reducer', () => {
  let mainOfferMock: MainOfferInfo;
  let sliceInitialState: OfferListState;

  beforeEach(() => {
    mainOfferMock = createMainOfferInfoMock();
    sliceInitialState = { ...STATE_TEMPLATE };
  });

  it('should return initial state by empty action', () => {
    const expectedState = sliceInitialState;

    const result = offersListReducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return initial state by state argument is undefined', () => {
    const expectedState = sliceInitialState;

    const result = offersListReducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  describe('is correct works by "updateOffer" action', () => {
    it('call "unionToMainOfferInfoAdapter" once', () => {
      const adapterSpy = vi.spyOn(adapters, 'unionToMainOfferInfoAdapter');
      const unionOffer = createUnionOfferInfoMock();

      offersListReducer(sliceInitialState, updateOffer(unionOffer));

      expect(adapterSpy).toBeCalledTimes(1);
    });

    it('return correct state by existed offer', () => {
      const unionOffer = createUnionOfferInfoMock();
      const adaptedOffer = adapters.unionToMainOfferInfoAdapter(unionOffer);
      const initialState: OfferListState = {
        error: null,
        offers: [{
          ...adaptedOffer,
          isFavorite: !adaptedOffer.isFavorite
        }]
      };
      const expectedState: OfferListState = {
        error: null,
        offers: [adaptedOffer]
      };

      const result = offersListReducer(initialState, updateOffer(unionOffer));

      expect(result).toEqual(expectedState);
    });
  });

  it('should return correct state by "fetchOffersList.pending" action', () => {
    const initialState: OfferListState = {
      error: null,
      offers: [mainOfferMock]
    };
    const expectedState = sliceInitialState;

    const result = offersListReducer(initialState, fetchOffersList.pending);

    expect(result).toEqual(expectedState);
  });

  it('should return correct state by "fetchOffersList.fullfilled" action', () => {
    const expectedState: OfferListState = {
      ...sliceInitialState,
      offers: [mainOfferMock]
    };

    const result = offersListReducer(sliceInitialState, fetchOffersList.fulfilled([mainOfferMock], '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should return correct state by "fetchOffersList.rejected" action', () => {
    const err = createHttpErrorMock(400);
    sliceInitialState.offers = [mainOfferMock];

    const expectedState: OfferListState = {
      error: {
        code: err.code,
        message: err.message
      },
      offers: []
    };

    const result = offersListReducer(sliceInitialState, fetchOffersList.rejected(err, '', undefined));

    expect(result).toEqual(expectedState);
  });
});
