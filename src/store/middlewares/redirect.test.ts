import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import { redirect } from './redirect';
import { AnyAction } from '@reduxjs/toolkit';
import { redirectToRoute } from '../cityAction.ts';
import { AppRoute } from '../../mocks/login.ts';
import browserHistory from '../../services/browserHistory';
import { State } from '../../types/state.ts';

vi.mock('../../browser-history', () => ({
  default: {
    location: { pathname: ''},
    push(path: string) {
      this.location.pathname = path;
    }
  }
}));

describe('Redirect middleware', () => {
  let store: MockStore;

  beforeAll(() => {
    const middleware = [redirect];
    const mockStoreCreator = configureMockStore<State, AnyAction>(middleware);
    store = mockStoreCreator();
  });

  beforeEach(() => {
    browserHistory.push('');
  });

  it('should not redirect to "/login" with empty action', () => {
    const emptyAction = { type: '', payload: AppRoute.Login };
    store.dispatch(emptyAction);
    expect(browserHistory.location.pathname).not.toBe(AppRoute.Login);
  });

  it('should redirect to "/login" with redirectToRoute action', () => {
    const redirectAction = redirectToRoute(AppRoute.Login);
    store.dispatch(redirectAction);
    expect(browserHistory.location.pathname).toBe(AppRoute.Login);
  });

  it('should redirect to "/main" with redirectToRoute action', () => {
    const redirectAction = redirectToRoute(AppRoute.Main);
    store.dispatch(redirectAction);
    expect(browserHistory.location.pathname).toBe(AppRoute.Main);
  });

  it('should redirect to "/offer" with redirectToRoute action', () => {
    const redirectAction = redirectToRoute(AppRoute.Offer);
    store.dispatch(redirectAction);
    expect(browserHistory.location.pathname).toBe(AppRoute.Offer);
  });

  it('should redirect to "/favourites" with redirectToRoute action', () => {
    const redirectAction = redirectToRoute(AppRoute.Favourites);
    store.dispatch(redirectAction);
    expect(browserHistory.location.pathname).toBe(AppRoute.Favourites);
  });
});
