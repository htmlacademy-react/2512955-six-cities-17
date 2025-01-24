import { createRedirectMiddleware } from '../redirect-middleware';
import { redirectToRouteAction, RedirectActionPayload } from '../actions';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { BrowserHistoryMock } from '@test-utills/mock/browser-history-mock';
import { BrowserHistory } from 'history';
import { AppThunkDispatch, emptyAction } from '@test-utills/mock/redux';
import { RootState } from '../redux';
import { Action } from '@reduxjs/toolkit';

describe('Redirect middleware', () => {
  const initialRoute = 'initial-route';
  const history = new BrowserHistoryMock(initialRoute);
  const redirectMiddleware = createRedirectMiddleware((history as unknown) as BrowserHistory);
  const storeCreator = configureMockStore<RootState, Action<string>, AppThunkDispatch>([redirectMiddleware]);
  let store: ReturnType<typeof storeCreator>;

  beforeEach(() => {
    store = storeCreator();
    history.replace(initialRoute);
  });

  it('should not works by empty action', () => {
    store.dispatch(emptyAction);

    expect(history.location).toBe(initialRoute);
  });

  it('should not works by no redirectToRouteAction', () => {
    const action: Action<string> = {
      type: 'anotherAction'
    };

    store.dispatch(action);

    expect(history.location).toBe(initialRoute);
  });

  describe('by redirectToRouteAction', () => {
    it('should correct works by replace', () => {
      const newRoute = 'new-route';
      const actionPayload: RedirectActionPayload = {
        route: newRoute,
        replace: true
      };

      store.dispatch(redirectToRouteAction(actionPayload));

      expect(history.location).toBe(newRoute);
    });

    it('should correct works by push', () => {
      const newRoute = 'new-route';
      const actionPayload: RedirectActionPayload = {
        route: newRoute
      };

      store.dispatch(redirectToRouteAction(actionPayload));

      expect(history.location).toBe(newRoute);
    });
  });
});
