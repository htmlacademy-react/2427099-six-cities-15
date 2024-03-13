import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import Container from '@components/container/container';
import { Offer } from '@type/offer';
import ListOffers from '@components/list-offers/list-offers';
import Map from '@components/map/map';
import { LOCATIONS } from '@const';
import Location from '@components/location/location';
import MainEmpty from '@components/main-empty/main-empty';
import { useAppDispatch, useAppSelector } from '@hooks/index';
import { selectLocation, setOffers } from '@store/action';
import OfferSort from '@components/offer-sort/offer-sort';

type TMainPageProps = {
  offers: Offer[];
}

function MainPage({ offers }: TMainPageProps): JSX.Element {
  const dispatch = useAppDispatch();
  const activeLocation = useAppSelector((state) => state.location);
  const selectedOffers = useAppSelector((state) => state.offers);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

  const handleLocationChange = (location: string) => {
    dispatch(selectLocation(location));
    dispatch(setOffers(offers));
  };

  return (
    <Container extraClass='page--gray page--main' classMain='page__main--index'>
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {LOCATIONS.map((location) => (
              <Location
                key={location}
                location={location}
                isActive={location === activeLocation}
                onActiveChange={() => handleLocationChange(location)}
              />
            ))}
          </ul>
        </section>
      </div>
      {selectedOffers.length === 0 ? <MainEmpty /> :
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {selectedOffers.length} {selectedOffers.length === 1 ? 'place' : 'places'} to stay in {selectedOffers[0].city.name}
              </b>
              <OfferSort />
              <ListOffers
                offers={selectedOffers}
                onOfferHover={setSelectedOffer}
                listBlock='cities__places-list'
                extraClass='tabs__content'
                block='cities'
              />
            </section>
            <div className="cities__right-section">
              <Map extraClass='cities' city={selectedOffers[0].city} offers={selectedOffers} selectedOfferId={selectedOffer?.id}/>
            </div>
          </div>
        </div>}
    </Container>
  );
}

export default MainPage;
