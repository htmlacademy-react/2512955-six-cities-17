import { emptyAction } from '@test-utills/mock/redux';
import offerSortingReducer, { changeSorting, SortingSliceState } from '../offer-sorting-select-slice';
import { OfferSortType } from '../types';

describe('Offer sorting slice reducer', () => {
  let initialSliceState: SortingSliceState;

  beforeEach(() => {
    initialSliceState = {
      priceSorting: OfferSortType.Default
    };
  });

  it('should return initial state with empty action', () => {
    const result = offerSortingReducer(initialSliceState, emptyAction);

    expect(result).toEqual(initialSliceState);
  });

  it('should return initial state with empty action and undefined state', () => {
    const result = offerSortingReducer(undefined, emptyAction);

    expect(result).toEqual(initialSliceState);
  });

  it('should return correct state for "changeSorting" action', () => {
    const newSortType = OfferSortType.IncreasePrice;
    const expectedState: SortingSliceState = {
      priceSorting: newSortType
    };

    const result = offerSortingReducer(initialSliceState, changeSorting(newSortType));

    expect(result).toEqual(expectedState);
  });
});
