import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducer';
import { createAPI } from '../services/api';
import { fetchOffers, fetchUserStatus } from './action';
import history from '../browser-history';

export const api = createAPI();
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: {
        api,
        history
      },
    },
  }),
});

store.dispatch(fetchOffers());
store.dispatch(fetchUserStatus());
