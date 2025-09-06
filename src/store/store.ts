import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducer';
import { createAPI } from '../services/api';
import { fetchCards, fetchUserStatus, setFavoritesStore } from './action';
import { loadFavorites } from '../utils';
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

store.dispatch(fetchCards());
store.dispatch(fetchUserStatus());
store.dispatch(setFavoritesStore(loadFavorites()));
// console.log(setFavoritesLocal(loadFavorites()));
