import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ApiRoute } from '@const';
import { Auth } from '@type/auth';
import { User } from '@type/user';
import { dropToken, saveToken } from '@services/token';

export const checkAuthAction = createAsyncThunk<User, undefined, { extra: AxiosInstance }>(
  'user/checkAuth',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<User>(ApiRoute.Login);
    return data;
  }
);

export const loginAction = createAsyncThunk<User, Auth, { extra: AxiosInstance }>(
  'user/login',
  async ({email, password}, { extra: api }) => {
    const { data } = await api.post<User>(ApiRoute.Login, {email, password});
    saveToken(data.token);
    return data;
  }
);

export const logoutAction = createAsyncThunk<void, undefined, { extra: AxiosInstance }>(
  'user/logout',
  async (_arg, { extra: api }) => {
    await api.delete(ApiRoute.Logout);
    dropToken();
  }
);
