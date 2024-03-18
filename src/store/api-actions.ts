import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Offer } from '@type/offer';
import { AppDispatch, State } from '@type/state';
import { offersActions } from './slices/offers';
import { ApiRoute } from '@const';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async(_arg, {dispatch, extra: api}) => {
    const response = await api.get<Offer[]>(ApiRoute.Offers);
    const data = response.data;
    dispatch(offersActions.loadOffers(data));
  }
);
