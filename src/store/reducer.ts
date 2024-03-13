import { createReducer } from '@reduxjs/toolkit';
import { selectLocation, setOffers } from '@store/action';
import offers from '../mocks/offers';
import { LOCATIONS } from '@const';

const initialState = {
  location: LOCATIONS[0],
  offers: [...offers].filter((offer) => offer.city.name === LOCATIONS[0])
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(selectLocation, (state, action) => {
      state.location = action.payload;
    })
    .addCase(setOffers, (state) => {
      state.offers = [...offers].filter((offer) => offer.city.name === state.location);
    });
});

export { reducer };
