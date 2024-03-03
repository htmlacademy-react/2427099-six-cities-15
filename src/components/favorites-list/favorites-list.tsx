import { Offer } from '../../types/offer';
import { getFavoriteCitiesFromOffers } from '../../utils/utils';
import FavoriteItem from '../favorite-item/favorite-item';

type TFavoriteListProps = {
  offers: Offer[];
}

function FavoriteList({offers}: TFavoriteListProps): JSX.Element {
  const cities = getFavoriteCitiesFromOffers({offers});
  return (
    <ul className="favorites__list">
      {
        cities.map((city) => (
          <FavoriteItem key={city} offers={offers} city={city}/>
        ))
      }
    </ul>
  );
}

export default FavoriteList;