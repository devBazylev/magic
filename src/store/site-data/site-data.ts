import { createSlice } from '@reduxjs/toolkit';

import type { SiteData } from '../../types';
import { StoreSlice } from '../../const';
import { fetchOffers, fetchOffer, fetchNearbyOffers, fetchComments, postComment, fetchFavoriteOffers, postFavorite } from '../action';

const initialState: SiteData = {
  offers: [],
  isOffersLoading: false,
  offer: null,
  isOfferLoading: false,
  nearbyOffers: [],
  comments: [],
  favoriteOffers: [],
  isFavoriteOffersLoading: false,
};

export const siteData = createSlice({
  name: StoreSlice.SiteData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.isOffersLoading = true;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersLoading = false;
      })
      .addCase(fetchOffer.pending, (state) => {
        state.isOfferLoading = true;
      })
      .addCase(fetchOffer.fulfilled, (state, action) => {
        state.offer = action.payload;
        state.isOfferLoading = false;
      })
      .addCase(fetchOffer.rejected, (state) => {
        state.isOfferLoading = false;
      })
      .addCase(fetchNearbyOffers.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(postComment.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(fetchFavoriteOffers.pending, (state) => {
        state.isFavoriteOffersLoading = true;
      })
      .addCase(fetchFavoriteOffers.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
        state.isFavoriteOffersLoading = false;
      })
      .addCase(fetchFavoriteOffers.rejected, (state) => {
        state.isFavoriteOffersLoading = false;
      })
      .addCase(postFavorite.fulfilled, (state, action) => {
        const updatedOffer = action.payload;
        state.offers = state.offers.map((offer) => offer.id === updatedOffer.id ? updatedOffer : offer);
        state.nearbyOffers = state.nearbyOffers.map((offer) => offer.id === updatedOffer.id ? updatedOffer : offer);

        if (state.offer && state.offer.id === updatedOffer.id) {
          // Обновляем только поля, которые есть в OfferProps
          state.offer = {
            ...state.offer,
            isFavorite: updatedOffer.isFavorite,
            price: updatedOffer.price,
            rating: updatedOffer.rating,
            isPremium: updatedOffer.isPremium,
            previewImage: updatedOffer.previewImage,
            description: updatedOffer.description,
            type: updatedOffer.type,
            city: updatedOffer.city,
            location: updatedOffer.location,
          };
        }

        if (updatedOffer.isFavorite) {
          state.favoriteOffers = state.favoriteOffers.concat(updatedOffer);
        } else {
          state.favoriteOffers = state.favoriteOffers.filter((favoriteOffer) => favoriteOffer.id !== updatedOffer.id);
        }
      });
  }
});
