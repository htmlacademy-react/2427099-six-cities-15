import { AuthorizationStatus } from '@const';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type AuthState = {
  authorizationStatus: AuthorizationStatus;
}

const initialState: AuthState = {
  authorizationStatus: AuthorizationStatus.Unknown,
};

const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    requireAuthorization: (state, action: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = action.payload;
    }
  },
  selectors: {
    selectAuthorizationStatus: (state: AuthState) => state.authorizationStatus
  }
});

const authActions = authSlice.actions;

export { authActions, authSlice };
