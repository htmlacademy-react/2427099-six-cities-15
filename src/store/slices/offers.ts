import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { LOCATIONS } from '@const';
import { Offer } from '@type/offer';
import offers from '../../mocks/offers';

type OffersState = {
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
  selectors: {
    selectLocation: (state: OffersState) => state.location,
    selectOffers: (state: OffersState) => state.offers,
  }
});

const offersActions = offersSlice.actions;
const offersSelectors = {
  ...offersSlice.selectors,
  selectOffersByLocation: createSelector(offersSlice.selectors.selectOffers, offersSlice.selectors.selectLocation, (allOffers, location) =>
    allOffers?.filter((offer) => offer.city.name === location)
  )
};

export { offersActions, offersSlice, offersSelectors };
