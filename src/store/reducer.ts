import { createReducer } from '@reduxjs/toolkit';
import { selectLocation, selectSortType, setOffers, setOffersBySortType } from '@store/action';
import offers from '../mocks/offers';
import { LOCATIONS, SORT_TYPES } from '@const';

const initialState = {
  location: LOCATIONS[0],
  sortType: SORT_TYPES[0].name,
  offers: [...offers].filter((offer) => offer.city.name === LOCATIONS[0])
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(selectLocation, (state, action) => {
      state.location = action.payload;
    })
    .addCase(setOffers, (state) => {
      state.offers = [...offers].filter((offer) => offer.city.name === state.location);
    })
    .addCase(selectSortType, (state, action) => {
      state.sortType = action.payload;
    })
    .addCase(setOffersBySortType, (state) => {
      switch (state.sortType) {
        case 'Price: low to high':
          state.offers = [...state.offers].sort((a, b) => a.price - b.price);
          break;
        case 'Price: high to low':
          state.offers = [...state.offers].sort((a, b) => b.price - a.price);
          break;
        case 'Top rated first':
          state.offers = [...state.offers].sort((a, b) => b.rating - a.rating);
          break;
        default:
          state.offers = [...offers].filter((offer) => offer.city.name === state.location);
      }
    });
});

export { reducer };
