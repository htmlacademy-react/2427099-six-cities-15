import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { LOCATIONS } from '@const';
import { Offer } from '@type/offer';
import { Comment } from '@type/comment';

type OffersState = {
  location: string;
  offers: Offer[];
  nearByOffers: Offer[];
  offer: Offer | null;
  comments: Comment[];
  isDataLoading: boolean;
}

const initialState: OffersState = {
  location: LOCATIONS[0],
  offers: [],
  nearByOffers: [],
  offer: null,
  comments: [],
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
    },
    loadOffer: (state, action: PayloadAction<Offer>) => {
      state.offer = action.payload;
    },
    loadNearbyOffers: (state, action: PayloadAction<Offer[]>) => {
      state.nearByOffers = action.payload;
    },
    loadComments: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
    }
  },
  selectors: {
    selectLocation: (state: OffersState) => state.location,
    selectOffers: (state: OffersState) => state.offers,
    selectOffer: (state: OffersState) => state.offer,
    selectNearByOffers: (state: OffersState) => state.nearByOffers,
    selectComments: (state: OffersState) => state.comments,
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
