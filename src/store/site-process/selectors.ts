import { StoreSlice } from '../../const';
import type { State, SortName } from '../../types';

export const getSorting = ({ [StoreSlice.SiteProcess]: SITE_PROCESS }: State): SortName => SITE_PROCESS.sorting;
