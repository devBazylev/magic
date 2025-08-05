// import { createSelector } from '@reduxjs/toolkit';
import type { State, CardProps } from '../../types';
import { StoreSlice } from '../../const';
// import { getSorting } from '../site-process/selectors';

export const getIsCardsLoading = ({ [StoreSlice.SiteData]: SITE_DATA }: State): boolean => SITE_DATA.isCardsLoading;

export const getCards = ({ [StoreSlice.SiteData]: SITE_DATA }: State): CardProps[] => SITE_DATA.cards;

// export const selectCards = createSelector(
//   [getCards, getSorting],
//   (cards, sorting) => {
//     const comparator = Comprator[sorting as keyof typeof Comprator];
//     return cards.sort(comparator);
//   }
// );
