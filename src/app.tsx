import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/main-page/main-page';
import NotFoundPage from './pages/not-found-page/not-found-page';
import LoginPage from './pages/login-page/login-page';
import FavoritesPage from './pages/favorites-page/favorites-page';
import OfferPage from './pages/offer-page/offer-page';
import ProtectedRoute from './components/protected-route/protected-route';

export default function App(): JSX.Element {
  return (
    <Routes>
      <Route path='/' element={<MainPage cards={Array.from({length: 4}, () => '')} />} />
      <Route path='/login' element={<LoginPage />}/>
      <Route path='/favorites' element={<ProtectedRoute hasAccess={false}><FavoritesPage /></ProtectedRoute>}/>
      <Route path='/offer/:id' element={<OfferPage />}/>
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}
