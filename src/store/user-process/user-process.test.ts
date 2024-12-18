import { datatype, internet } from 'faker';
import { AuthorizationStatus } from '../../mocks/login.ts';
import { fakeUser, initialStateUserMock, mockUser } from '../../mocks/store-mock.ts';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions.ts';
import { userProcess } from './user-process.ts';

describe('User slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = mockUser;

    const result = userProcess.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });
  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = initialStateUserMock;

    const result = userProcess.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });
  it('should return auth status and email with fullfiled checkAuthAction', () => {
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Auth,
      userEmail: internet.email(),
      isUserDataLoading: false
    };

    const result = userProcess.reducer(
      undefined,
      checkAuthAction.fulfilled(
        expectedState.userEmail, '', datatype.string())
    );

    expect(result).toEqual(expectedState);
  });

  it('should return auth status and email with rejected checkAuthAction', () => {
    const expectedState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      userEmail: '',
      isUserDataLoading: false
    };

    const result = userProcess.reducer(
      undefined,
      checkAuthAction.rejected(
        null, '', datatype.string())
    );

    expect(result).toEqual(expectedState);
  });
  it('should return auth status with fullfiled loginAction', () => {
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Auth,
      userEmail: '',
      isUserDataLoading: false
    };
    const authData = fakeUser;

    const result = userProcess.reducer(
      undefined,
      loginAction.fulfilled(
        undefined, '', authData)
    );

    expect(result).toEqual(expectedState);
  });
  it('should return no auth status with rejected loginAction', () => {
    const expectedState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      userEmail: '',
      isUserDataLoading: false
    };
    const authData = fakeUser;

    const result = userProcess.reducer(
      undefined,
      loginAction.rejected(
        null, '', authData)
    );

    expect(result).toEqual(expectedState);
  });
  it('should return no auth status with fullfiled logoutAction', () => {
    const expectedState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      userEmail: '',
      isUserDataLoading: false
    };

    const result = userProcess.reducer(
      undefined,
      logoutAction.fulfilled(
        undefined, '', datatype.string())
    );

    expect(result).toEqual(expectedState);
  });

});
