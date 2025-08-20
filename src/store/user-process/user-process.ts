import { createSlice } from '@reduxjs/toolkit';

import type { UserProcess } from '../../types';
import { fetchUserStatus, loginUser, logoutUser, registerUser } from '../action';
import { AuthorizationStatus, StoreSlice } from '../../const';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: '',
  error: null,
};

export const userProcess = createSlice({
  name: StoreSlice.UserProcess,
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUserStatus.fulfilled, (state, action) => {
        state.user = action.payload?.email || '';
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(fetchUserStatus.rejected, (state) => {
        state.user = '';
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.user = '';
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.error = action.payload as string || 'Error logging in.';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.user = '';
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.error = action.payload as string || 'Error registering.';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = '';
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  }
});

export const { clearError } = userProcess.actions;
