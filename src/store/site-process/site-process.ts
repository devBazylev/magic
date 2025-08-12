import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { SiteProcess, SortName } from '../../types';
import { StoreSlice } from '../../const';

const initialState: SiteProcess = {
  sorting: 'Popular',
  mobile: null,
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
  },
});

export const { setSorting, setMedia } = siteProcess.actions;
