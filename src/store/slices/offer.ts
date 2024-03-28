import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Offer } from '@type/offer';
import { Comment } from '@type/comment';
import { RequestStatus } from '@const';
import { fetchNearByOffersAction, fetchOfferByIdAction } from '@store/thunks/offers';

type OfferState = {
  nearByOffers: Offer[];
  offer: Offer | null;
  comments: Comment[];
  status: RequestStatus;
}

const initialState: OfferState = {
  nearByOffers: [],
  offer: null,
  comments: [],
  status: RequestStatus.Idle
};

const offerSlice = createSlice({
  extraReducers: (builder) =>
    builder
      .addCase(fetchOfferByIdAction.fulfilled, (state, action) => {
        state.offer = action.payload;
        state.status = RequestStatus.Success;
      })
      .addCase(fetchOfferByIdAction.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })
      .addCase(fetchOfferByIdAction.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchNearByOffersAction.fulfilled, (state, action) => {
        state.nearByOffers = action.payload;
      }),
  initialState,
  name: 'offer',
  reducers: {
    updateOffer: (state: OfferState, action: PayloadAction<string>) => {
      if (state.offer?.id === action.payload) {
        state.offer.isFavorite = !state.offer.isFavorite;
      }
      state.nearByOffers = state.nearByOffers.map((offer) => offer.id === action.payload ? { ...offer, isFavorite: !offer.isFavorite } : offer);
    }
  },
  selectors: {
    selectOffer: (state: OfferState) => state.offer,
    selectNearByOffers: (state: OfferState) => state.nearByOffers,
    selectComments: (state: OfferState) => state.comments,
    selectOfferStatus: (state: OfferState) => state.status
  }
});

const offerActions = { ...offerSlice.actions, fetchOfferByIdAction, fetchNearByOffersAction };
const offerSelectors = {...offerSlice.selectors};

export { offerActions, offerSlice, offerSelectors };
