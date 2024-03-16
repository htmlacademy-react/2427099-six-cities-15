import { State } from '@type/state';

const selectOffers = (state: State) => state.offers;
const selectLocation = (state: State) => state.location;
const selectOffersByCity = (state: State) =>
  state.offers.filter((offer) => offer.city.name === state.location);

export { selectLocation, selectOffers, selectOffersByCity };
