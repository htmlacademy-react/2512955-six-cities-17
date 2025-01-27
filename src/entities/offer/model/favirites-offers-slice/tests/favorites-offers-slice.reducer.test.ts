import { createMainOfferInfoMock, createUnionOfferInfoMock } from '@test-utills/mock/offer';
import { MainOfferInfo, OfferListState, UnionOfferInfo } from '../../types';
import { favoritesOffersReducer, updateOffer } from '../favorites-offers-slice';
import { STATE_TEMPLATE } from '@entities/offer/config/const';
import { emptyAction } from '@test-utills/mock/redux';
import * as adapters from '../../../lib/adapters/union-offer-info-adapters';
import { fetchFavoritesOffersList } from '../actions';
import { createHttpErrorMock } from '@test-utills/mock/http-error-mock';

describe('Favorites offers list reducer', () => {
  let mainOfferMock: MainOfferInfo;
  let sliceInitialState: OfferListState;

  beforeEach(() => {
    mainOfferMock = {...createMainOfferInfoMock(), isFavorite: true};
    sliceInitialState = { ...STATE_TEMPLATE };
  });

  it('should return initial state by empty action', () => {
    const expectedState = sliceInitialState;

    const result = favoritesOffersReducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return initial state by state argument is undefined', () => {
    const expectedState = sliceInitialState;

    const result = favoritesOffersReducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  describe('is correct works by "updateOffer" action', () => {
    it('call "unionToMainOfferInfoAdapter" once', () => {
      const unionOffer = createUnionOfferInfoMock();
      const offerAdapterMock = vi.spyOn(adapters, 'unionToMainOfferInfoAdapter');

      favoritesOffersReducer(sliceInitialState, updateOffer(unionOffer));

      expect(offerAdapterMock).toBeCalledTimes(1);
    });

    it('return correct state by is favorite offer', () => {
      const unionOffer: UnionOfferInfo = {...createUnionOfferInfoMock(), isFavorite: true};
      const adaptedOffer = adapters.unionToMainOfferInfoAdapter(unionOffer);
      const expectedState: OfferListState = {
        error: null,
        offers: [adaptedOffer],
        loading: false
      };

      const result = favoritesOffersReducer(sliceInitialState, updateOffer(unionOffer));

      expect(result).toEqual(expectedState);
    });

    it('return correct state by is not favorite offer', () => {
      const unionOffer: UnionOfferInfo = {...createUnionOfferInfoMock(), isFavorite: false};
      const adaptedOffer = adapters.unionToMainOfferInfoAdapter(unionOffer);
      sliceInitialState.offers = [adaptedOffer];
      const expectedState: OfferListState = {
        error: null,
        offers: [],
        loading: false
      };

      const result = favoritesOffersReducer(sliceInitialState, updateOffer(unionOffer));

      expect(result).toEqual(expectedState);
    });
  });

  it('should return correct state by "fetchOffersList.pending" action', () => {
    const initialState: OfferListState = {
      error: null,
      offers: [mainOfferMock],
      loading: false
    };
    const expectedState: OfferListState = {
      ...sliceInitialState,
      loading: true
    };

    const result = favoritesOffersReducer(initialState, fetchFavoritesOffersList.pending);

    expect(result).toEqual(expectedState);
  });

  it('should return correct state by "fetchOffersList.fullfilled" action', () => {
    const expectedState: OfferListState = {
      ...sliceInitialState,
      offers: [mainOfferMock],
      loading: false
    };

    const result = favoritesOffersReducer(sliceInitialState, fetchFavoritesOffersList.fulfilled([mainOfferMock], '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should return correct state by "fetchOffersList.rejected" action', () => {
    const err = createHttpErrorMock(406);
    sliceInitialState.offers = [mainOfferMock];

    const expectedState: OfferListState = {
      error: {
        code: err.code,
        message: err.message
      },
      offers: [],
      loading: false
    };

    const result = favoritesOffersReducer(sliceInitialState, fetchFavoritesOffersList.rejected(err, '', undefined));

    expect(result).toEqual(expectedState);
  });
});
