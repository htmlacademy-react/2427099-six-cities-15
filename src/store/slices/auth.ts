import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '@const';
import { User } from '@type/user';

type AuthState = {
  authorizationStatus: AuthorizationStatus;
  userData: User | null;
}

const initialState: AuthState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: null
};

const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    requireAuthorization: (state, action: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = action.payload;
    },
    setUserData: (state, action: PayloadAction<User | null>) => {
      state.userData = action.payload;
    }
  },
  selectors: {
    selectAuthorizationStatus: (state: AuthState) => state.authorizationStatus,
    selectUserData: (state: AuthState) => state.userData
  }
});

const authActions = authSlice.actions;
const authSelectors = {...authSlice.selectors};

export { authActions, authSlice, authSelectors };
