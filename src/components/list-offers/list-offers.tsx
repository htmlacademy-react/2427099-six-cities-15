import { Offer } from '../../types/offer';
import Card from '../card/card';

type TListOffers = {
  offers: Offer[];
}

function ListOffers({offers}: TListOffers): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => <Card key={offer.id} offer={offer} />)}
    </div>
  );
}

export default ListOffers;
