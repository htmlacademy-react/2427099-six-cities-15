import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import Container from '@components/container/container';
import { Offer } from '@type/offer';
import ListOffers from '@components/list-offers/list-offers';
import Map from '@components/map/map';
import { LOCATIONS, SortTypeOption } from '@const';
import Location from '@components/location/location';
import MainEmpty from '@components/main-empty/main-empty';
import { useAppDispatch, useAppSelector } from '@hooks/index';
import Sort from '@components/sort/sort';
import { offersActions, offersSelectors } from '@store/slices/offers';

function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const activeLocation = useAppSelector(offersSelectors.selectLocation);
  let selectedOffers = useAppSelector(offersSelectors.selectOffersByLocation);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [activeSortType, setActiveSortType] = useState(SortTypeOption.Popular);

  const handleLocationChange = (location: string) => {
    dispatch(offersActions.setLocation(location));
  };

  switch (activeSortType) {
    case SortTypeOption.PriceLowToHigh:
      selectedOffers = [...selectedOffers].sort((a, b) => a.price - b.price);
      break;
    case SortTypeOption.PriceHighToLow:
      selectedOffers = [...selectedOffers].sort((a, b) => b.price - a.price);
      break;
    case SortTypeOption.TopRatedFirst:
      selectedOffers = [...selectedOffers].sort((a, b) => b.rating - a.rating);
      break;
  }

  return (
    <Container isLoginNav extraClass='page--gray page--main' classMain='page__main--index'>
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
                onLocationChange={() => handleLocationChange(location)}
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
              <Sort currentType={activeSortType} setter={setActiveSortType} />
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
