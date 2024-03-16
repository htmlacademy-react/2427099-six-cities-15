import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { LOCATIONS } from '@const';
import { Offer } from '@type/offer';
import offers from '../../mocks/offers';

interface OffersState {
  location: string;
  offers: Offer[];
}

const initialState: OffersState = {
  location: LOCATIONS[0],
  offers
};

const offersSlice = createSlice({
  initialState,
  name: 'offers',
  reducers: {
    setLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
    },
  },
});

const offersActions = offersSlice.actions;

export {offersActions, offersSlice};
