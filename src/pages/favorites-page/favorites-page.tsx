import { Helmet } from 'react-helmet-async';
import { useAppSelector } from '@hooks/index';
import { favoritesSelectors } from '@store/slices/favorites';
import Container from '@components/container/container';
import FavoriteList from '@components/favorites-list/favorites-list';
import FavoritesEmpty from '@components/favorites-empty/favorites-empty';
import { RequestStatus } from '@const';
import Loader from '@components/loader/loader';

function FavoritesPage(): JSX.Element {
  const favoriteOffers = useAppSelector(favoritesSelectors.selectFavoriteOffers);
  const status = useAppSelector(favoritesSelectors.selectFavoritesStatus);

  if (status === RequestStatus.Loading) {
    return <Loader />;
  }

  return (
    <Container isLoginNav classMain='page__main--favorites'>
      <Helmet>
        <title>6 cities: favorites</title>
      </Helmet>
      {
        favoriteOffers?.length > 0 ? (
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
