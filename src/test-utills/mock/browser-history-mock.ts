export class BrowserHistoryMock {
  private locationStore: string[];

  constructor(initialRoute: string) {
    this.locationStore = [initialRoute];
  }

  public get location() {
    return this.locationStore[this.locationStore.length - 1];
  }

  public push(route: string) {
    this.locationStore.push(route);
  }

  public replace(route: string) {
    this.locationStore = [route];
  }
}
