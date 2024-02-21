import { Helmet } from 'react-helmet-async';
import Container from '../../components/container/container';
import FavoriteLocation from '../../components/favorite-location/favorite-location';

function FavoritesPage(): JSX.Element {
  return (
    <Container classMain='page__main--favorites'>
      <Helmet>
        <title>6 cities: favorites</title>
      </Helmet>
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            <FavoriteLocation />
            <FavoriteLocation />
            <FavoriteLocation />
          </ul>
        </section>
      </div>
    </Container>
  );
}

export default FavoritesPage;
