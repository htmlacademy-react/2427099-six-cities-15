import { Helmet } from 'react-helmet-async';
import Container from '../../components/container/container';
import FavoriteList from '../../components/favorites-list/favorites-list';
import { Offer } from '../../types/offer';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';

type TFavoritePageProps = {
  offers?: Offer[];
}

function FavoritesPage({offers}: TFavoritePageProps): JSX.Element {
  const favotiteOffers = offers?.filter((offer) => offer.isFavorite);
  return (
    <Container classMain='page__main--favorites'>
      <Helmet>
        <title>6 cities: favorites</title>
      </Helmet>
      {
        favotiteOffers?.length ? (
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <FavoriteList offers={favotiteOffers}/>
            </section>
          </div>
        ) : <FavoritesEmpty />
      }
    </Container>
  );
}

export default FavoritesPage;
