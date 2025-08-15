import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { CardProps, SiteProcess, SortName } from '../../types';
import { StoreSlice } from '../../const';

const initialState: SiteProcess = {
  sorting: 'popular',
  mobile: null,
  overlay: false,
  modal: false,
  cart: [],
};

export const siteProcess = createSlice({
  name: StoreSlice.SiteProcess,
  initialState,
  reducers: {
    setSorting: (state, action: PayloadAction<SortName>) => {
      state.sorting = action.payload;
    },
    setMedia: (state, action: PayloadAction<boolean>) => {
      state.mobile = action.payload;
    },
    setOverlay: (state, action: PayloadAction<boolean>) => {
      state.overlay = action.payload;
    },
    setModal: (state, action: PayloadAction<boolean>) => {
      state.modal = action.payload;
    },
    setCart: (state, action: PayloadAction<CardProps[]>) => {
      state.cart = action.payload;
    },
  },
});

export const { setSorting, setMedia, setOverlay, setModal, setCart } = siteProcess.actions;
