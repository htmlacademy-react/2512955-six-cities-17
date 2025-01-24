import { createGlobalLoaderSliceState } from './utills';
import { getLoaderSelector } from '../global-loader-slice';

describe('Global loader slice selectors', () => {
  describe('get loading selector', () => {
    it('should return correct value', () => {
      const state = createGlobalLoaderSliceState();

      const result = getLoaderSelector(state);

      expect(result).toBe(state.loading.loading);
    });
  });
});
