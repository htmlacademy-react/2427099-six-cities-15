import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '@type/state';
import { ApiRoute, AuthorizationStatus } from '@const';
import { Auth } from '@type/auth';
import { authActions } from '@store/slices/auth';
import { User } from '@type/user';
import { dropToken, getToken, saveToken } from '@services/token';


export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const token = getToken();
      if (!token) {
        dispatch(authActions.requireAuthorization(AuthorizationStatus.NoAuth));
        return;
      }
      const { data } = await api.get<User>(ApiRoute.Login);
      dispatch(authActions.requireAuthorization(AuthorizationStatus.Auth));
      dispatch(authActions.setUserData(data));
    } catch {
      dispatch(authActions.requireAuthorization(AuthorizationStatus.NoAuth));
    }
  }
);

export const loginAction = createAsyncThunk<void, Auth, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    const { data } = await api.post<User>(ApiRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(authActions.requireAuthorization(AuthorizationStatus.Auth));
    dispatch(authActions.setUserData(data));
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(ApiRoute.Logout);
    dropToken();
    dispatch(authActions.requireAuthorization(AuthorizationStatus.NoAuth));
    dispatch(authActions.setUserData(null));
  }
);
