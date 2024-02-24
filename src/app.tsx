import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from './const';
import MainPage from './pages/main-page/main-page';
import NotFoundPage from './pages/not-found-page/not-found-page';
import LoginPage from './pages/login-page/login-page';
import FavoritesPage from './pages/favorites-page/favorites-page';
import OfferPage from './pages/offer-page/offer-page';
import ProtectedRoute from './components/protected-route/protected-route';
import { Offer } from './types/offer';

type TAppProps = {
  offers: Offer[];
}

export default function App({ offers }: TAppProps): JSX.Element {
  return (
    <Routes>
      <Route
        path={AppRoute.Root}
        element={<MainPage offers={offers} />}
      />
      <Route
        path={AppRoute.Login}
        element={<LoginPage />}
      />
      <Route
        path={AppRoute.Favorites}
        element={<ProtectedRoute authorizationStatus={AuthorizationStatus.NoAuth}><FavoritesPage /></ProtectedRoute>}
      />
      <Route
        path={`${AppRoute.Offer}/:offerId`}
        element={<OfferPage />}
      />
      <Route
        path='*'
        element={<NotFoundPage />}
      />
    </Routes>
  );
}
