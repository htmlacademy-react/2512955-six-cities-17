import { Nullable } from '@shared/types';

export class LocalStorageMock {
  private values: Record<string, string>;

  constructor(store: Record<string, string>) {
    this.values = store;
  }

  public getItem(itemName: string): Nullable<string> {
    return itemName in this.values ? this.values[itemName] : null;
  }

  public setItem(itemName: string, value: string): void {
    this.values[itemName] = value;
  }

  public removeItem(itemName: string) {
    if (itemName in this.values) {
      delete this.values[itemName];
    }
  }

  public get length() {
    return Object.keys(this.values).length;
  }

  public clear() {
    this.values = {};
  }

  public key(index: number) {
    const keys = Object.keys(this.values);
    return (index <= keys.length && index >= 0) ? keys[index] : null;
  }
}
