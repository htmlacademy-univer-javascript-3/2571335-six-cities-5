import {createSlice} from '@reduxjs/toolkit';
import { NAMESPACE } from '../../mocks/slice-headers.ts';
import {AuthorizationStatus} from '../../mocks/login.ts';
import {UserProcess} from '../../types/state.ts';
import {checkAuthAction, loginAction, logoutAction} from '../api-actions.ts';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userEmail: '',
  isUserDataLoading: false
};

export const userProcess = createSlice({
  name: NAMESPACE.USER,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder

      .addCase(checkAuthAction.fulfilled, (state, action) => {
        if (action.payload === 'error'){
          state.authorizationStatus = AuthorizationStatus.NoAuth;
          state.isUserDataLoading = false;
        } else {
          state.authorizationStatus = AuthorizationStatus.Auth;
          state.userEmail = action.payload;
          state.isUserDataLoading = false;
        }
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(checkAuthAction.pending,(state) =>{
        state.isUserDataLoading = true;
      })

      .addCase(loginAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.isUserDataLoading = false;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.pending,(state) => {
        state.isUserDataLoading = true;
      })

      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.isUserDataLoading = false;
      })
      .addCase(logoutAction.pending, (state)=> {
        state.isUserDataLoading = true;
      });


  }
});
