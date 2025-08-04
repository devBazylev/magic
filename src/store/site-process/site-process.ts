import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { SiteProcess, SortName } from '../../types';
import { StoreSlice } from '../../const';

const initialState: SiteProcess = {

};

export const siteProcess = createSlice({
  name: StoreSlice.SiteProcess,
  initialState,
  reducers: {
    setSorting: (state, action: PayloadAction<SortName>) => {
      state.sorting = action.payload;
    }
  },
});

export const { setSorting } = siteProcess.actions;
