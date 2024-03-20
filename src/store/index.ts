import {configureStore} from '@reduxjs/toolkit';
import { offersSlice } from '@store/slices/offers';
import { createAPI } from '@services/api';
import { authSlice } from './slices/auth';

export const api = createAPI();

export const store = configureStore({
  reducer: {
    [offersSlice.name]: offersSlice.reducer,
    [authSlice.name]: authSlice.reducer
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({
      thunk: {
        extraArgument: api
      }
    })
});
