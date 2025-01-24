import { getOfferSortingType, OfferSortingPick } from '../offer-sorting-select-slice';
import { OfferSortType } from '../types';

describe('Get offer sorting type slice selector', () => {
  it('should return correct state', () => {
    const state: OfferSortingPick = {
      activeSorting: {
        priceSorting: OfferSortType.DecreasePrice
      }
    };

    const result = getOfferSortingType(state);

    expect(result).toBe(state.activeSorting.priceSorting);
  });
});
