import { renderHook } from '@testing-library/react';
import { useMainOffersListFetch } from '../use-main-offers-list-fetch';

const useOfferListFetchReturnMock = vi.fn();

describe('Hook \'useMainOffersListFetch\'', () => {
  beforeEach(() => {
    useOfferListFetchReturnMock.mockReset();
  });

  it('should return correct signature', async () => {
    vi.spyOn(await import('../use-offers-list-fetch'), 'useOffersListFetch')
      .mockImplementation(() => useOfferListFetchReturnMock);
    const functionType = 'function';
    const { result } = renderHook(() => useMainOffersListFetch());

    expect(typeof result.current).toBe(functionType);
  });

  it('should call fetch of \'useOffersListFetch\' by call return callback', async () => {
    vi.spyOn(await import('../use-offers-list-fetch'), 'useOffersListFetch')
      .mockImplementation(() => useOfferListFetchReturnMock);
    const { result } = renderHook(() => useMainOffersListFetch());

    await result.current();

    expect(useOfferListFetchReturnMock).toBeCalledTimes(1);
  });
});
