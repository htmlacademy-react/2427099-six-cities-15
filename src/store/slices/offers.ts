import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { LOCATIONS } from '@const';
import { Offer } from '@type/offer';

type OffersState = {
  location: string;
  offers: Offer[];
  isDataLoading: boolean;
}

const initialState: OffersState = {
  location: LOCATIONS[0],
  offers: [],
  isDataLoading: false,
};

const offersSlice = createSlice({
  initialState,
  name: 'offers',
  reducers: {
    setLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
    },
    setLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isDataLoading = action.payload;
    },
    loadOffers: (state, action: PayloadAction<Offer[]>) => {
      state.offers = action.payload;
    }
  },
  selectors: {
    selectLocation: (state: OffersState) => state.location,
    selectOffers: (state: OffersState) => state.offers,
    selectLoadingStatus: (state: OffersState) => state.isDataLoading
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
