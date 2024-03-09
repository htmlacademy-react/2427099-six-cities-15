import { Offer } from '../../types/offer';
import Card from '../card/card';

type TListOffers = {
  offers: Offer[];
  onOfferHover?: (offer: Offer | null) => void;
  listBlock: string;
  extraClass?: string;
  block: string;
}

function ListOffers({offers, onOfferHover, listBlock, extraClass, block}: TListOffers): JSX.Element {
  return (
    <div className={`${listBlock} places__list ${extraClass}`}>
      {offers.map((offer) => <Card key={offer.id} offer={offer} block={block} onMouseOver={onOfferHover}/>)}
    </div>
  );
}

export default ListOffers;
