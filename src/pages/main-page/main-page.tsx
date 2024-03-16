import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import classNames from 'classnames';
import Container from '@components/container/container';
import { Offer } from '@type/offer';
import ListOffers from '@components/list-offers/list-offers';
import Map from '@components/map/map';
import { LOCATIONS, SORT_TYPES } from '@const';
import Location from '@components/location/location';
import MainEmpty from '@components/main-empty/main-empty';
import { useAppDispatch, useAppSelector } from '@hooks/index';
import SortItem from '@components/sort-item/sort-item';
import { selectLocation, selectOffersByCity } from '@store/selectors/offers';
import { offersActions } from '@store/slices/offers';

function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const activeLocation = useAppSelector(selectLocation);
  const selectedOffers = useAppSelector(selectOffersByCity);
  // const activeSortType = useAppSelector((state) => state.sortType);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [isSortOpened, setIsSortOpened] = useState<boolean>(false);

  const handleSortBlockClick = () => {
    setIsSortOpened(!isSortOpened);
  };

  const handleLocationChange = (location: string) => {
    dispatch(offersActions.setLocation(location));
    // dispatch(selectSortType(SORT_TYPES[0].name));
  };

  // const handleSortTypeClick = (type: string) => {
  //   dispatch(selectSortType(type));
  //   dispatch(setOffersBySortType(selectedOffers));
  //   setIsSortOpened(!isSortOpened);
  // };

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
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0} onClick={handleSortBlockClick}>
                  {/* {activeSortType} */}
                  <svg className="places__sorting-arrow" width={7} height={4}>
                    <use xlinkHref="#icon-arrow-select" />
                  </svg>
                </span>
                <ul className={classNames('places__options places__options--custom', isSortOpened && 'places__options--opened')}>
                  {/* {
                    SORT_TYPES.map((type) => (
                      <SortItem
                        key={type.name}
                        type={type.name}
                        isSortSelected={type.name === activeSortType}
                        onSortTypeClick={() => handleSortTypeClick(type.name)}
                      />
                    ))
                  } */}
                </ul>
              </form>
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
