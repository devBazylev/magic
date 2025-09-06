import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { CardProps, SortName, User, UserAuth, State } from '../types';
import type { AxiosInstance } from 'axios';
import { APIRoute, AppRoute } from '../const';
import { joinPaths, loadFavorites, mergeFavorites, saveFavorites } from '../utils';
import { saveToken, dropToken, getToken } from '../services/token';
import { History } from 'history';

interface ThunkExtraArg {
  api: AxiosInstance;
  history: History;
  state: () => State;
}

export const Action = {
  SET_MEDIA: 'device/set',
  SET_OVERLAY: 'overlay/set',
  SET_SORTING: 'sorting/set',
  SET_FAVORITES_STORE: 'favorites-store/set',
  FETCH_CARDS: 'cards/set',
  LOGIN_USER: 'user/login',
  LOGOUT_USER: 'user/logout',
  FETCH_USER_STATUS: 'user/fetch-status',
  REGISTER_USER: 'user/register',
  SYNC_FAVORITES: 'favorites/sync',
};

export const setMedia = createAction<boolean>(Action.SET_MEDIA);
export const setOverlay = createAction<boolean>(Action.SET_OVERLAY);
export const setSorting = createAction<SortName>(Action.SET_SORTING);
export const setFavoritesStore = createAction<number[]>(Action.SET_FAVORITES_STORE);

export const fetchCards = createAsyncThunk<CardProps[], undefined, { extra: ThunkExtraArg }>(
  Action.FETCH_CARDS,
  async (_, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<CardProps[]>(APIRoute.GET_DATA);

    return data;
  }
);

export const loginUser = createAsyncThunk<{ email: string; favorites: number[]; id?: number }, UserAuth, { extra: ThunkExtraArg }>(
  Action.LOGIN_USER,
  async ({ email, password }, { extra, rejectWithValue }) => {
    try {
      const { api, history } = extra;

      const authResponse = await api.post(APIRoute.AUTH, {
        email,
        password
      });

      const { token } = authResponse.data as { token: string };

      if (token) {
        saveToken(token);

        try {
          const userResponse = await api.get<User>(APIRoute.AUTH_ME);
          const userData = userResponse.data;
          const serverFavorites = userData.favorites || [];
          const localFavorites = loadFavorites();
          const mergedFavorites = mergeFavorites(serverFavorites, localFavorites);
          saveFavorites(mergedFavorites);

          const path = joinPaths(import.meta.env.BASE_URL || '', AppRoute.Root);
          history.push(path);
          return { email: userData.email || '', favorites: mergedFavorites, id: userData.id || undefined };
        } catch (userError) {
          const localFavorites = loadFavorites();
          const path = joinPaths(import.meta.env.BASE_URL || '', AppRoute.Root);
          history.push(path);
          return { email, favorites: localFavorites };
        }
      }

      return rejectWithValue('Invalid email or password');

    } catch (error: unknown) {
      return rejectWithValue('Invalid email or password');
    }
  }
);

export const logoutUser = createAsyncThunk<void, undefined, { extra: ThunkExtraArg }>(
  Action.LOGOUT_USER,
  (_, { extra }) => {
    const { history } = extra;

    dropToken();
    const path = joinPaths(import.meta.env.BASE_URL || '', AppRoute.Root);
    history.push(path);
  }
);

export const fetchUserStatus = createAsyncThunk<User | null, undefined, { extra: ThunkExtraArg }>(
  Action.FETCH_USER_STATUS,
  async (_, { extra }) => {
    const { api } = extra;
    const token = getToken();

    if (!token) {
      return null;
    }

    try {
      const { data } = await api.get<User>(APIRoute.AUTH_ME);
      const serverFavorites = data.favorites || [];
      const localFavorites = loadFavorites();
      const mergedFavorites = mergeFavorites(serverFavorites, localFavorites);
      saveFavorites(mergedFavorites);

      return {
        email: data.email || '',
        token: data.token || '',
        favorites: mergedFavorites,
        id: data.id || undefined
      };
    } catch (error) {
      dropToken();
      return null;
    }
  }
);

export const registerUser = createAsyncThunk<{ email: string; favorites: number[] }, UserAuth, { extra: ThunkExtraArg }>(
  Action.REGISTER_USER,
  async ({ email, password }, { extra, rejectWithValue }) => {
    try {
      const { api, history, state } = extra;
      const currentState = state();
      const favorites = currentState.SITE_DATA.favoritesStore || [];

      await api.post(APIRoute.REGISTER, { email, password, favorites });

      const authResponse = await api.post(APIRoute.AUTH, { email, password });

      const { token } = authResponse.data as { token: string };

      if (token) {
        saveToken(token);
        const path = joinPaths(import.meta.env.BASE_URL || '', AppRoute.Root);
        history.push(path);
        return { email, favorites };
      }

      return rejectWithValue('Registration successful but login failed.');

    } catch (error: unknown) {
      return rejectWithValue('Registration failed. Try again later.');
    }
  }
);

export const syncFavorites = createAsyncThunk<void, number[], { extra: ThunkExtraArg }>(
  Action.SYNC_FAVORITES,
  async (favorites, { extra, rejectWithValue }) => {
    const { api, state } = extra;
    try {
      const currentState = state();
      const userId = currentState.USER_PROCESS.userId;
      if (userId) {
        // Используем ID пользователя для обновления
        await api.patch(`${APIRoute.LOGIN}/${userId}`, {
          favorites: favorites
        });
      } else {
        // Если ID неизвестен, пробуем с email
        const userEmail = currentState.USER_PROCESS.user;
        await api.patch(APIRoute.LOGIN, {
          email: userEmail,
          favorites: favorites
        });
      }
    } catch (error: unknown) {
      return rejectWithValue('Failed to sync favorites with server.');
    }
  }
);
