import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from './const';
import MainPage from './pages/main-page/main-page';
import NotFoundPage from './pages/not-found-page/not-found-page';
import LoginPage from './pages/login-page/login-page';
import FavoritesPage from './pages/favorites-page/favorites-page';
import OfferPage from './pages/offer-page/offer-page';
import ProtectedRoute from './components/protected-route/protected-route';
import { Offer } from './types/offer';
import { Comment } from './types/comment';

type TAppProps = {
  offers: Offer[];
  comments: Comment[];
}

export default function App({ offers, comments }: TAppProps): JSX.Element {
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
        element={<ProtectedRoute authorizationStatus={AuthorizationStatus.NoAuth}><FavoritesPage offers={offers}/></ProtectedRoute>}
      />
      <Route
        path={`${AppRoute.Offer}/:offerId`}
        element={<OfferPage offers={offers} comments={comments}/>}
      />
      <Route
        path='*'
        element={<NotFoundPage />}
      />
    </Routes>
  );
}
