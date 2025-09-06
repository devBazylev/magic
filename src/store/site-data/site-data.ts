import type { SiteData } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { StoreSlice } from '../../const';
import { fetchCards, setFavoritesStore } from '../action';

const initialState: SiteData = {
  cards: [],
  isCardsLoading: false,
  favoritesStore: [],
};

export const siteData = createSlice({
  name: StoreSlice.SiteData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.isCardsLoading = true;
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.cards = action.payload;
        state.isCardsLoading = false;
      })
      .addCase(setFavoritesStore, (state, action) => {
        state.favoritesStore = action.payload;
      });
  }
});
