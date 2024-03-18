import {configureStore} from '@reduxjs/toolkit';
import { offersSlice } from './slices/offers';
import { createAPI } from 'src/services/api';

export const api = createAPI();

export const store = configureStore({
  reducer: {
    [offersSlice.name]: offersSlice.reducer
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({
      thunk: {
        extraArgument: api
      }
    })
});
