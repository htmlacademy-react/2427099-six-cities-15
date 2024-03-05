import { Offer } from '../../types/offer';
import Card from '../card/card';

type TListOffers = {
  offers: Offer[];
  onOfferHover?: (offer: Offer | null) => void;
}

function ListOffers({offers, onOfferHover}: TListOffers): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => <Card key={offer.id} offer={offer} block='cities' onMouseOver={onOfferHover}/>)}
    </div>
  );
}

export default ListOffers;
