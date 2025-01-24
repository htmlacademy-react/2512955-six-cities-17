import { emptyAction } from '@test-utills/mock/redux';
import locationFilterReducer, { changeLocation, SliceState } from '../location-filter-slice';
import { OfferCityName } from '@entities/offer';


describe('Locatiion filter reducer', () => {
  let initialSliceState: SliceState;

  beforeEach(() => {
    initialSliceState = {
      location: 'Paris'
    };
  });

  it('should return initial state with empty action', () => {
    const result = locationFilterReducer(initialSliceState, emptyAction);

    expect(result).toEqual(initialSliceState);
  });

  it('should return initial state with empty action and undefined state', () => {
    const result = locationFilterReducer(undefined, emptyAction);

    expect(result).toEqual(initialSliceState);
  });

  it('should return correct state for "changeLocation" action', () =>{
    const newLocation: OfferCityName = 'Dusseldorf';
    const expectedState: SliceState = {
      location: newLocation
    };

    const result = locationFilterReducer(initialSliceState, changeLocation(newLocation));

    expect(result).toEqual(expectedState);
  });
});
