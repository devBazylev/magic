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
  LOGIN_USER: 'user/login',
  LOGOUT_USER: 'user/logout',
  FETCH_USER_STATUS: 'user/fetch-status',
  FETCH_CARDS: 'cards/set',
  SET_SORTING: 'sorting/set',
  SET_MEDIA: 'device/set',
  SET_OVERLAY: 'overlay/set',
};

export const setMedia = createAction<boolean>(Action.SET_MEDIA);
export const setOverlay = createAction<boolean>(Action.SET_OVERLAY);
export const setSorting = createAction<SortName>(Action.SET_SORTING);

export const loginUser = createAsyncThunk<UserAuth['email'], UserAuth, { extra: ThunkExtraArg }>(
  Action.LOGIN_USER,
  async ({ email, password }, { extra }) => {
    const { api, history } = extra;
    const userResponse = await api.get(`${APIRoute.LOGIN}?email=${email}&password=${password}`);

    if (!userResponse.data) {
      throw new Error('User not found');
    }

    const authResponse = await api.post(APIRoute.AUTH, { email, password });
    const { token } = authResponse.data as { token: string };

    if (token) {
      saveToken(token);
    }

    const path = joinPaths(import.meta.env.BASE_URL || '', AppRoute.Root);
    history.push(path);

    return email;
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
    const token = getToken();
    if (!token) {
      throw new Error('Token not found');
    }

    const { data } = await api.get<{ data: User }>(APIRoute.AUTH_ME);
    return data.data;
  }
);
