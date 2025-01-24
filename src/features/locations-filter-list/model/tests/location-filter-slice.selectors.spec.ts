import { getActiveLocation, ActiveLocationStatePick } from '../selector';

describe('Location filter slice selector', () => {
  it('should return correct state', () => {
    const state: ActiveLocationStatePick = {
      activeLocation: {
        location: 'Brussels'
      }
    };

    const result = getActiveLocation(state);

    expect(result).toBe(state.activeLocation.location);
  });
});
