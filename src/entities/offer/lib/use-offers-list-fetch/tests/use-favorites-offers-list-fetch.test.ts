import { renderHook } from '@testing-library/react';
import { useFavoritesOffersListFetch } from '../use-favorites-offers-list-fetch';

const useOfferListFetchReturnMock = vi.fn();

describe('Hook \'useMainOffersListFetch\'', () => {
  beforeEach(() => {
    useOfferListFetchReturnMock.mockReset();
  });

  it('should return correct signature', async () => {
    vi.spyOn(await import('../use-offers-list-fetch'), 'useOffersListFetch')
      .mockImplementation(() => useOfferListFetchReturnMock);
    const functionType = 'function';
    const { result } = renderHook(() => useFavoritesOffersListFetch());

    expect(typeof result.current).toBe(functionType);
  });

  it('should call fetch of \'useOffersListFetch\' by call return callback', async () => {
    vi.spyOn(await import('../use-offers-list-fetch'), 'useOffersListFetch')
      .mockImplementation(() => useOfferListFetchReturnMock);
    const { result } = renderHook(() => useFavoritesOffersListFetch());

    await result.current();

    expect(useOfferListFetchReturnMock).toBeCalledTimes(1);
  });
});
