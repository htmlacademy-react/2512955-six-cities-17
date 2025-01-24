import { LocalStorageToken } from '../token';
import { LocalStorageMock } from '@test-utills/mock/local-storage-mock';

describe('class "LocalStorageToken"', () => {
  const TOKEN_KEY = 'TEST_TOKEN_KEY';
  const TOKEN_VALUE = 'TEST_TOKEN_VALUE';
  let tokenStorage: Record<string, string>;

  beforeEach(() => {
    tokenStorage = {};
    const localStorageMock = new LocalStorageMock(tokenStorage);
    window.localStorage = localStorageMock;
  });

  it('should be creating', () => {
    const token = new LocalStorageToken(TOKEN_KEY);
    expect(token).toBeInstanceOf(LocalStorageToken);
  });

  describe('method "get"', () => {
    it('should return "null" if token value not defined', () => {
      const token = new LocalStorageToken(TOKEN_KEY);

      const result = token.get();

      expect(result).toBeNull();
    });

    it('should return correct value if token value defined', () => {
      const token = new LocalStorageToken(TOKEN_KEY);
      tokenStorage[TOKEN_KEY] = TOKEN_VALUE;

      const result = token.get();

      expect(result).toBe(TOKEN_VALUE);
    });
  });

  describe('method "set"', () => {
    it('should setting value into token storage', () => {
      const token = new LocalStorageToken(TOKEN_KEY);

      token.set(TOKEN_VALUE);

      expect(tokenStorage[TOKEN_KEY]).toBe(TOKEN_VALUE);
    });
  });

  describe('method "clear"', () => {
    it('should remove token from token storage', () => {
      const token = new LocalStorageToken(TOKEN_KEY);
      tokenStorage[TOKEN_KEY] = TOKEN_VALUE;

      token.clear();

      expect(tokenStorage[TOKEN_KEY]).toBeUndefined();
    });
  });
});
