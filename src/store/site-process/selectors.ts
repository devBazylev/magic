import { StoreSlice } from '../../const';
import type { State, SortName } from '../../types';

export const getSorting = ({ [StoreSlice.SiteProcess]: SITE_PROCESS }: State): SortName => SITE_PROCESS.sorting;
export const getMedia = ({ [StoreSlice.SiteProcess]: SITE_PROCESS }: State): boolean | null => SITE_PROCESS.mobile;
export const getOverlay = ({ [StoreSlice.SiteProcess]: SITE_PROCESS }: State): boolean | null => SITE_PROCESS.overlay;
