import {configureStore} from '@reduxjs/toolkit';
import { offersSlice } from '@store/slices/offers';
import { createAPI } from '@services/api';
import { authSlice } from '@store/slices/auth';
import { offerSlice } from '@store/slices/offer';
import { commentsSlice } from '@store/slices/comments';
import { favoritesSlice } from '@store/slices/favorites';

export const api = createAPI();

export const store = configureStore({
  reducer: {
    [offersSlice.name]: offersSlice.reducer,
    [offerSlice.name]: offerSlice.reducer,
    [commentsSlice.name]: commentsSlice.reducer,
    [authSlice.name]: authSlice.reducer,
    [favoritesSlice.name]: favoritesSlice.reducer
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({
      thunk: {
        extraArgument: api
      }
    })
});
