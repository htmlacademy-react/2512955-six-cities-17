import { IToken } from './token-interface';

export class LocalStorageToken implements IToken<string> {
  private tokenName: string;

  constructor(tokenKeyName: string) {
    this.tokenName = tokenKeyName;
  }

  public get = () => localStorage.getItem(this.tokenName);

  public set = (value: string) => {
    localStorage.setItem(this.tokenName, value);
  };

  public clear = () => {
    localStorage.removeItem(this.tokenName);
  };
}
