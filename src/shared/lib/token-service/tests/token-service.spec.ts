import { TokenService, tokenServiceInstance } from '../token-service';
import { LocalStorageToken } from '../token';

describe('token service', () => {
  it('should be created', () => {
    expect(tokenServiceInstance).toBeInstanceOf(TokenService);
  });

  it('contains authorization token', () => {
    const token = tokenServiceInstance['authorizationToken'];

    expect(token).toBeInstanceOf(LocalStorageToken);
  });
});
