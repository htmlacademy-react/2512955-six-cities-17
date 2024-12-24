import type { IToken } from './token-interface';
import { LocalStorageToken } from './token';

const AUTHORIZATION_TOKEN_NAME = 'AUTHORIZATION_TOKEN';

class TokenService {
  private authorizationTokenInstance: IToken<string>;

  constructor() {
    this.authorizationTokenInstance = new LocalStorageToken(AUTHORIZATION_TOKEN_NAME);
  }

  public get authorizationToken() {
    return this.authorizationTokenInstance;
  }
}

const tokenServiceInstance = new TokenService();

export { tokenServiceInstance };
