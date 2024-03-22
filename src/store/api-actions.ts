import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Offer } from '@type/offer';
import { AppDispatch, State } from '@type/state';
import { offersActions } from './slices/offers';
import { ApiRoute, AuthorizationStatus } from '@const';
import { Auth } from '@type/auth';
import { authActions } from './slices/auth';
import { User } from '@type/user';
import { dropToken, getToken, saveToken } from '@services/token';
import { Comment } from '@type/comment';
import { CommentData } from '@type/comment-data';

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

export const fetchOfferByIdAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOfferById',
  async (offerId, {dispatch, extra: api}) => {
    dispatch(offersActions.setLoadingStatus(true));
    const { data } = await api.get<Offer>(`${ApiRoute.Offers}/${offerId}`);
    dispatch(offersActions.setLoadingStatus(false));
    dispatch(offersActions.loadOffer(data));
  }
);

export const fetchNearByOffersAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchNearByOffers',
  async (offerId, {dispatch, extra: api}) => {
    const { data } = await api.get<Offer[]>(`${ApiRoute.Offers}/${offerId}/nearby`);
    dispatch(offersActions.loadNearbyOffers(data));
  }
);

export const fetchCommentsAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchComments',
  async (offerId, {dispatch, extra: api}) => {
    const { data } = await api.get<Comment[]>(`${ApiRoute.Comments}/${offerId}`);
    dispatch(offersActions.loadComments(data));
  }
);

export const addCommentAction = createAsyncThunk<void, CommentData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/addComment',
  async ({offerId, comment, rating}, {dispatch, extra: api}) => {
    await api.post<Comment>(`${ApiRoute.Comments}/${offerId}`, {comment, rating});
    dispatch(fetchCommentsAction(offerId));
  }
);

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
