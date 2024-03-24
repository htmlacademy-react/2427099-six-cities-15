import { ApiRoute } from '@const';
import { createAppAsyncThunk } from '@hooks/index';
import { Offer } from '@type/offer';

type FavoriteProps = {
  offerId: string;
  isFavorite: boolean;
};

export const fetchFavoritesAction = createAppAsyncThunk<Offer[], undefined>(
  'data/fetchFavorites',
  async (_args, { extra: api }) => {
    const { data } = await api.get<Offer[]>(ApiRoute.Favorites);
    return data;
  }
);

export const changeFavoriteAction = createAppAsyncThunk<Offer, FavoriteProps>(
  'data/changeFavorite',
  async ({offerId, isFavorite}, { extra: api }) => {
    const { data } = await api.post<Offer>(`${ApiRoute.Favorites}/${offerId}/${isFavorite ? 1 : 0}`);
    return data;
  }
);
