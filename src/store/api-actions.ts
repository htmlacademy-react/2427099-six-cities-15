import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Offer } from '@type/offer';
import { AppDispatch, State } from '@type/state';
import { offersActions } from './slices/offers';
import { ApiRoute, AuthorizationStatus } from '@const';
import { Auth } from '@type/auth';
import { authActions } from './slices/auth';
import { User } from '@type/user';
import { dropToken, saveToken } from '@services/token';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(offersActions.setLoadingStatus(true));
    const { data } = await api.get<Offer[]>(ApiRoute.Offers);
    dispatch(offersActions.setLoadingStatus(false));
    dispatch(offersActions.loadOffers(data));
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    await api.get(ApiRoute.Login);
    try {
      dispatch(authActions.requireAuthorization(AuthorizationStatus.Auth));
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
  }
);
