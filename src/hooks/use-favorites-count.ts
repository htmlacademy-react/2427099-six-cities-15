import { RequestStatus } from '@const';
import { useAppDispatch, useAppSelector } from '@hooks/index';
import { getToken } from '@services/token';
import { favoritesSelectors } from '@store/slices/favorites';
import { fetchFavoritesAction } from '@store/thunks/favorites';
import { useEffect } from 'react';

function useFavoritesCount() {
  const status = useAppSelector(favoritesSelectors.selectFavoritesStatus);
  const count = useAppSelector(favoritesSelectors.selectFavoriteOffers).length;
  const token = getToken();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === RequestStatus.Idle && token) {
      dispatch(fetchFavoritesAction());
    }
  }, [dispatch, status, token]);

  return count;
}

export default useFavoritesCount;
