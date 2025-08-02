import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { CityName, OfferProps, SortName, User, UserAuth, FullOfferProps, Comment, CommentAuth } from '../types';
import type { AxiosInstance } from 'axios';
import { APIRoute, AppRoute } from '../const';
import { joinPaths } from '../utils';
import { saveToken, dropToken } from '../services/token';
import { History } from 'history';

interface ThunkExtraArg {
  api: AxiosInstance;
  history: History;
}

type Extra = {
  api: AxiosInstance;
  history: History;
}

export const Action = {
  LOGIN_USER: 'user/login',
  LOGOUT_USER: 'user/logout',
  SET_CITY: 'city/set',
  SET_SORTING: 'sorting/set',
  FETCH_OFFER: 'offers/fetch',
  FETCH_OFFERS: 'offers/set',
  FETCH_USER_STATUS: 'user/fetch-status',
  FETCH_NEARBY_OFFERS: 'offers/fetch-nearby',
  FETCH_COMMENTS: 'offer/fetch-comments',
  POST_COMMENT: 'offer/post-comment',
  FETCH_FAVORITE_OFFERS: 'offers/fetch-favorite',
  POST_FAVORITE: 'offer/post-favorite',
};

export const setCity = createAction<CityName>(Action.SET_CITY);
export const setSorting = createAction<SortName>(Action.SET_SORTING);

export const fetchOffers = createAsyncThunk<OfferProps[], undefined, { extra: ThunkExtraArg }>(
  Action.FETCH_OFFERS,
  async (_, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<OfferProps[]>(APIRoute.Offers);

    return data;
  }
);
export const fetchUserStatus = createAsyncThunk<User, undefined, { extra: ThunkExtraArg }>(
  Action.FETCH_USER_STATUS,
  async (_, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<User>(APIRoute.Login);

    return data;
  }
);
export const loginUser = createAsyncThunk<UserAuth['email'], UserAuth, { extra: ThunkExtraArg }>(
  Action.LOGIN_USER,
  async ({ email, password }, { extra }) => {
    const { api, history } = extra;
    const { data } = await api.post<User>(APIRoute.Login, { email, password });
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
      await api.delete(APIRoute.Logout);
    } catch (error) {
      // Игнорируем ошибки при logout, так как токен все равно нужно удалить
    }

    dropToken();
    const path = joinPaths(import.meta.env.BASE_URL || '', AppRoute.Root);
    history.push(path);
  }
);
export const fetchNearbyOffers = createAsyncThunk<FullOfferProps[], FullOfferProps['id'], { extra: ThunkExtraArg }>(
  Action.FETCH_NEARBY_OFFERS,
  async (id, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<FullOfferProps[]>(`${APIRoute.Offers}/${id}/nearby`);

    return data;
  }
);
export const fetchComments = createAsyncThunk<Comment[], FullOfferProps['id'], { extra: ThunkExtraArg }>(
  Action.FETCH_COMMENTS,
  async (id, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<Comment[]>(`${APIRoute.Comments}/${id}`);

    return data;
  }
);
export const postComment = createAsyncThunk<Comment[], CommentAuth, { extra: Extra }>(
  Action.POST_COMMENT,
  async ({ id, comment, rating }, { extra }) => {
    const { api } = extra;
    const { data } = await api.post<Comment[]>(`${APIRoute.Comments}/${id}`, { comment, rating });

    return data;
  }
);

export const fetchFavoriteOffers = createAsyncThunk<OfferProps[], undefined, { extra: Extra }>(
  Action.FETCH_FAVORITE_OFFERS,
  async (_, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<OfferProps[]>(APIRoute.Favorite);

    return data;
  }
);

export const postFavorite = createAsyncThunk<OfferProps, { id: number; status: 1 | 0 }, { extra: Extra }>(
  Action.POST_FAVORITE,
  async ({ id, status }, { extra }) => {
    const { api, history } = extra;

    try {
      const { data } = await api.post<OfferProps>(`${APIRoute.Favorite}/${id}/${status}`);

      return data;
    } catch (error) {
      const axiosError = error as { response?: { status: number } };

      if (axiosError.response?.status === 401) {
        history.push(AppRoute.Login);
      }

      return Promise.reject(error);
    }
  }
);

function convertToFullOfferProps(data: OfferProps): FullOfferProps {
  return {
    ...data,
    title: data.description,
    isFavorite: data.isFavorite,
    bedrooms: 1,
    maxAdults: 2,
    goods: [],
    images: [data.previewImage],
    host: {
      name: 'Имя хоста',
      avatarUrl: 'img/avatar.svg',
      isPro: false,
    },
  };
}

export const fetchOffer = createAsyncThunk<FullOfferProps, number, { extra: ThunkExtraArg }>(
  Action.FETCH_OFFER,
  async (id, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<OfferProps>(`${APIRoute.Offers}/${id}`);

    return convertToFullOfferProps(data);
  }
);
