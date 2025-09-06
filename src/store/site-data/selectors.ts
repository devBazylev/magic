import type { State, CardProps } from '../../types';
import { StoreSlice } from '../../const';

export const getIsCardsLoading = ({ [StoreSlice.SiteData]: SITE_DATA }: State): boolean => SITE_DATA.isCardsLoading;
export const getCards = ({ [StoreSlice.SiteData]: SITE_DATA }: State): CardProps[] => SITE_DATA.cards;
export const getFavoritesStore = ({ [StoreSlice.SiteData]: SITE_DATA }: State): number[] => SITE_DATA.favoritesStore;
