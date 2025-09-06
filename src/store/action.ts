import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { CardProps, SortName, User, UserAuth } from '../types';
import type { AxiosInstance } from 'axios';
import { APIRoute, AppRoute } from '../const';
import { joinPaths } from '../utils';
import { saveToken, dropToken, getToken } from '../services/token';
import { History } from 'history';

interface ThunkExtraArg {
  api: AxiosInstance;
  history: History;
}

export const Action = {
  SET_MEDIA: 'device/set',
  SET_OVERLAY: 'overlay/set',
  SET_SORTING: 'sorting/set',
  SET_FAVORITES_LOCAL: 'favorites-local/set',
  FETCH_CARDS: 'cards/set',
  LOGIN_USER: 'user/login',
  LOGOUT_USER: 'user/logout',
  FETCH_USER_STATUS: 'user/fetch-status',
  REGISTER_USER: 'user/register',
};

export const setMedia = createAction<boolean>(Action.SET_MEDIA);
export const setOverlay = createAction<boolean>(Action.SET_OVERLAY);
export const setSorting = createAction<SortName>(Action.SET_SORTING);
export const setFavoritesLocal = createAction<number[]>(Action.SET_FAVORITES_LOCAL);

export const fetchCards = createAsyncThunk<CardProps[], undefined, { extra: ThunkExtraArg }>(
  Action.FETCH_CARDS,
  async (_, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<CardProps[]>(APIRoute.GET_DATA);

    return data;
  }
);

export const loginUser = createAsyncThunk<UserAuth['email'], UserAuth, { extra: ThunkExtraArg }>(
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
        const path = joinPaths(import.meta.env.BASE_URL || '', AppRoute.Root);
        history.push(path);
        return email;
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
      return data;
    } catch (error) {
      dropToken();
      return null;
    }
  }
);

export const registerUser = createAsyncThunk<UserAuth['email'], UserAuth, { extra: ThunkExtraArg }>(
  Action.REGISTER_USER,
  async ({ email, password }, { extra, rejectWithValue }) => {
    try {
      const { api, history } = extra;

      await api.post(APIRoute.REGISTER, { email, password });

      const authResponse = await api.post(APIRoute.AUTH, { email, password });

      const { token } = authResponse.data as { token: string };

      if (token) {
        saveToken(token);
        const path = joinPaths(import.meta.env.BASE_URL || '', AppRoute.Root);
        history.push(path);
        return email;
      }

      return rejectWithValue('Registration successful but login failed.');

    } catch (error: unknown) {
      return rejectWithValue('Registration failed. Try again later.');
    }
  }
);
