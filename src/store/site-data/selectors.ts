import { createSelector } from '@reduxjs/toolkit';
import type { State, CardProps } from '../../types';
import { StoreSlice, Comprator } from '../../const';
import { getCity, getSorting } from '../site-process/selectors';

export const getIsCardsLoading = ({ [StoreSlice.SiteData]: SITE_DATA }: State): boolean => SITE_DATA.isCardsLoading;

export const getCards = ({ [StoreSlice.SiteData]: SITE_DATA }: State): CardProps[] => SITE_DATA.cards;

export const selectCards = createSelector(
  [getCards, getCity, getSorting],
  (cards, city, sorting) => {
    const filteredCards = cards.filter((card) => card.name === city.name);
    const comparator = Comprator[sorting as keyof typeof Comprator];
    return filteredCards.sort(comparator);
  }
);
