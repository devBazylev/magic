import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { CardProps, SortName, User, UserAuth } from '../types';
import type { AxiosInstance } from 'axios';
import { APIRoute, AppRoute } from '../const';
import { joinPaths } from '../utils';
import { saveToken, dropToken } from '../services/token';
import { History } from 'history';

interface ThunkExtraArg {
  api: AxiosInstance;
  history: History;
}

export const Action = {
  LOGIN_USER: 'user/login',
  LOGOUT_USER: 'user/logout',
  FETCH_USER_STATUS: 'user/fetch-status',
  FETCH_CARDS: 'cards/set',
  SET_SORTING: 'sorting/set',
  SET_MEDIA: 'resolution/set',
};

export const setMedia = createAction<boolean>(Action.SET_MEDIA);
export const setSorting = createAction<SortName>(Action.SET_SORTING);

export const loginUser = createAsyncThunk<UserAuth['email'], UserAuth, { extra: ThunkExtraArg }>(
  Action.LOGIN_USER,
  async ({ email, password }, { extra }) => {
    const { api, history } = extra;
    const { data } = await api.post<User>(APIRoute.LOGIN, { email, password });
    const { token } = data;

    saveToken(token);
    const path = joinPaths(import.meta.env.BASE_URL || '', AppRoute.Root);
    history.push(path);

    return email;
  }
);

export const logoutUser = createAsyncThunk<void, undefined, { extra: ThunkExtraArg }>(
  Action.LOGOUT_USER,
  async (_, { extra }) => {
    const { api, history } = extra;

    try {
      await api.delete(APIRoute.LOGOUT);
    } catch (error) {
      // Ignore errors when logging out, because the token needs to be deleted anyway
    }

    dropToken();
    const path = joinPaths(import.meta.env.BASE_URL || '', AppRoute.Root);
    history.push(path);
  }
);

export const fetchCards = createAsyncThunk<CardProps[], undefined, { extra: ThunkExtraArg }>(
  Action.FETCH_CARDS,
  async (_, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<CardProps[]>(APIRoute.GET_DATA);

    return data;
  }
);

export const fetchUserStatus = createAsyncThunk<User, undefined, { extra: ThunkExtraArg }>(
  Action.FETCH_USER_STATUS,
  async (_, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<User>(APIRoute.LOGIN);

    return data;
  }
);
