import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Offer } from '@type/offer';
import { ApiRoute } from '@const';

export const fetchOffersAction = createAsyncThunk<Offer[], undefined, { extra: AxiosInstance }>(
  'data/fetchOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Offer[]>(ApiRoute.Offers);
    return data;
  }
);

export const fetchOfferByIdAction = createAsyncThunk<Offer, string, { extra: AxiosInstance }>(
  'data/fetchOfferById',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<Offer>(`${ApiRoute.Offers}/${offerId}`);
    return data;
  }
);

export const fetchNearByOffersAction = createAsyncThunk<Offer[], string, { extra: AxiosInstance }>(
  'data/fetchNearByOffers',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<Offer[]>(`${ApiRoute.Offers}/${offerId}/nearby`);
    return data;
  }
);
