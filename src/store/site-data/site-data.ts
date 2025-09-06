import type { SiteData } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { StoreSlice } from '../../const';
import { fetchCards, setFavoritesLocal } from '../action';

const initialState: SiteData = {
  cards: [],
  isCardsLoading: false,
  favoritesLocal: [],
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
      .addCase(setFavoritesLocal, (state, action) => {
        state.favoritesLocal = action.payload;
      });
  }
});
