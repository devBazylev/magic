import { createSlice } from '@reduxjs/toolkit';

import type { SiteData } from '../../types';
import { StoreSlice } from '../../const';
import { fetchCards } from '../action';

const initialState: SiteData = {
  cards: [],
  isCardsLoading: false,
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
      });
  }
});
