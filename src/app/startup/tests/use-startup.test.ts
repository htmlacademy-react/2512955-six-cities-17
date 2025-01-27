import { useStartup } from '../use-startup';
import { AuthorizationStatusEnum } from '@shared/types';
import { renderHook } from '@testing-library/react';
import { createUserMock } from '@test-utills/mock/user';

const FETCH_MAIN_OFFERS_MOCK = vi.fn();
const FETCH_FAVORITES_OFFERS_MOCK = vi.fn();
const CHECK_AUTHORIZATION_MOCK = vi.fn();

describe('Hook \'useStartup\'', () => {
  beforeEach(() => {
    FETCH_MAIN_OFFERS_MOCK.mockReset();
    FETCH_FAVORITES_OFFERS_MOCK.mockReset();
    CHECK_AUTHORIZATION_MOCK.mockReset();
  });

  it('should return correct signature', async () => {
    vi.spyOn(await import('@entities/offer'), 'useMainOffersListFetch')
      .mockImplementation(() => FETCH_MAIN_OFFERS_MOCK);
    vi.spyOn(await import('@entities/offer'), 'useFavoritesOffersListFetch')
      .mockImplementation(() => FETCH_FAVORITES_OFFERS_MOCK);
    vi.spyOn(await import('@entities/user'), 'useAuthorization')
      .mockImplementation(() => ({
        authorizationStatus: AuthorizationStatusEnum.Unknown,
        checkAuthorization: CHECK_AUTHORIZATION_MOCK,
        login: vi.fn(),
        logout: vi.fn(),
        user: null
      }));

    const { result } = renderHook(() => useStartup());

    expect(result.current).toBeUndefined();
  });

  it('should call \'checkAuthorization\' from \'useAuthorization\' hook', async () => {
    vi.spyOn(await import('@entities/offer'), 'useMainOffersListFetch')
      .mockImplementation(() => FETCH_MAIN_OFFERS_MOCK);
    vi.spyOn(await import('@entities/offer'), 'useFavoritesOffersListFetch')
      .mockImplementation(() => FETCH_FAVORITES_OFFERS_MOCK);
    vi.spyOn(await import('@entities/user'), 'useAuthorization')
      .mockImplementation(() => ({
        authorizationStatus: AuthorizationStatusEnum.Unknown,
        checkAuthorization: CHECK_AUTHORIZATION_MOCK,
        login: vi.fn(),
        logout: vi.fn(),
        user: null
      }));

    renderHook(() => useStartup());

    expect(CHECK_AUTHORIZATION_MOCK).toBeCalled();
  });

  describe('for no authorized user', () => {
    it('should fetch main offers', async () => {
      vi.spyOn(await import('@entities/offer'), 'useMainOffersListFetch')
        .mockImplementation(() => FETCH_MAIN_OFFERS_MOCK);
      vi.spyOn(await import('@entities/offer'), 'useFavoritesOffersListFetch')
        .mockImplementation(() => FETCH_FAVORITES_OFFERS_MOCK);
      vi.spyOn(await import('@entities/user'), 'useAuthorization')
        .mockImplementation(() => ({
          authorizationStatus: AuthorizationStatusEnum.NoAuthorized,
          checkAuthorization: CHECK_AUTHORIZATION_MOCK,
          login: vi.fn(),
          logout: vi.fn(),
          user: null
        }));

      renderHook(() => useStartup());

      expect(FETCH_MAIN_OFFERS_MOCK).toBeCalled();
    });

    it('should not fetch favorites offers', async () => {
      vi.spyOn(await import('@entities/offer'), 'useMainOffersListFetch')
        .mockImplementation(() => FETCH_MAIN_OFFERS_MOCK);
      vi.spyOn(await import('@entities/offer'), 'useFavoritesOffersListFetch')
        .mockImplementation(() => FETCH_FAVORITES_OFFERS_MOCK);
      vi.spyOn(await import('@entities/user'), 'useAuthorization')
        .mockImplementation(() => ({
          authorizationStatus: AuthorizationStatusEnum.NoAuthorized,
          checkAuthorization: CHECK_AUTHORIZATION_MOCK,
          login: vi.fn(),
          logout: vi.fn(),
          user: null
        }));

      renderHook(() => useStartup());

      expect(FETCH_FAVORITES_OFFERS_MOCK).not.toBeCalled();
    });
  });

  describe('for authorized user', () => {
    it('should fetch main offers', async () => {
      vi.spyOn(await import('@entities/offer'), 'useMainOffersListFetch')
        .mockImplementation(() => FETCH_MAIN_OFFERS_MOCK);
      vi.spyOn(await import('@entities/offer'), 'useFavoritesOffersListFetch')
        .mockImplementation(() => FETCH_FAVORITES_OFFERS_MOCK);
      vi.spyOn(await import('@entities/user'), 'useAuthorization')
        .mockImplementation(() => ({
          authorizationStatus: AuthorizationStatusEnum.Authorized,
          checkAuthorization: CHECK_AUTHORIZATION_MOCK,
          login: vi.fn(),
          logout: vi.fn(),
          user: createUserMock()
        }));

      renderHook(() => useStartup());

      expect(FETCH_MAIN_OFFERS_MOCK).toBeCalled();
    });

    it('should fetch favorites offers', async () => {
      vi.spyOn(await import('@entities/offer'), 'useMainOffersListFetch')
        .mockImplementation(() => FETCH_MAIN_OFFERS_MOCK);
      vi.spyOn(await import('@entities/offer'), 'useFavoritesOffersListFetch')
        .mockImplementation(() => FETCH_FAVORITES_OFFERS_MOCK);
      vi.spyOn(await import('@entities/user'), 'useAuthorization')
        .mockImplementation(() => ({
          authorizationStatus: AuthorizationStatusEnum.Authorized,
          checkAuthorization: CHECK_AUTHORIZATION_MOCK,
          login: vi.fn(),
          logout: vi.fn(),
          user: createUserMock()
        }));

      renderHook(() => useStartup());

      expect(FETCH_FAVORITES_OFFERS_MOCK).toBeCalled();
    });
  });
});
