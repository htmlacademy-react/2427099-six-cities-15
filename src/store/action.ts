import { createAction } from '@reduxjs/toolkit';
import { Offer } from '@type/offer';

export const selectLocation = createAction<string>('selectLocation');
export const setOffers = createAction<Offer[]>('setOffers');
