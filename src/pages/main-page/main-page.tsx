import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import classNames from 'classnames';
import Container from '@components/container/container';
import { Offer } from '@type/offer';
import ListOffers from '@components/list-offers/list-offers';
import Map from '@components/map/map';
import { LOCATIONS } from '@const';
import Location from '@components/location/location';
import MainEmpty from '@components/main-empty/main-empty';

type TMainPageProps = {
  offers: Offer[];
}

function MainPage({ offers }: TMainPageProps): JSX.Element {
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [activeLocation, setActiveLocation] = useState<string>(LOCATIONS[3]);
  const [isSortOpened, setIsSortOpened] = useState<boolean>(false);

  const handleSortBlockClick = () => {
    setIsSortOpened(!isSortOpened);
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
                onActiveChange={() => setActiveLocation(location)}
              />
            ))}
          </ul>
        </section>
      </div>
      {offers.length === 0 ? <MainEmpty /> :
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in Amsterdam</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0} onClick={handleSortBlockClick}>
              Popular
                  <svg className="places__sorting-arrow" width={7} height={4}>
                    <use xlinkHref="#icon-arrow-select" />
                  </svg>
                </span>
                <ul className={classNames('places__options places__options--custom', isSortOpened && 'places__options--opened')}>
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <ListOffers
                offers={offers}
                onOfferHover={setSelectedOffer}
                listBlock='cities__places-list'
                extraClass='tabs__content'
                block='cities'
              />
            </section>
            <div className="cities__right-section">
              <Map extraClass='cities' city={offers[0].city} offers={offers} selectedOfferId={selectedOffer?.id}/>
            </div>
          </div>
        </div>}
    </Container>
  );
}

export default MainPage;
