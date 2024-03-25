import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/index';
import { favoritesSelectors } from '@store/slices/favorites';
import { RequestStatus } from '@const';
import { fetchFavoritesAction } from '@store/thunks/favorites';
import Container from '@components/container/container';
import FavoriteList from '@components/favorites-list/favorites-list';
import FavoritesEmpty from '@components/favorites-empty/favorites-empty';
import Loader from '@components/loader/loader';

function FavoritesPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const favoriteOffers = useAppSelector(favoritesSelectors.selectFavoriteOffers);
  const favoriteStatus = useAppSelector(favoritesSelectors.selectFavoritesStatus);

  useEffect(() => {
    dispatch(fetchFavoritesAction());
  }, [dispatch]);

  if (favoriteStatus === RequestStatus.Loading) {
    return <Loader />;
  }

  return (
    <Container isLoginNav classMain='page__main--favorites'>
      <Helmet>
        <title>6 cities: favorites</title>
      </Helmet>
      {
        favoriteOffers?.length ? (
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <FavoriteList offers={favoriteOffers}/>
            </section>
          </div>
        ) : <FavoritesEmpty />
      }
    </Container>
  );
}

export default FavoritesPage;
