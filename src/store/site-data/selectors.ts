import { createSelector } from '@reduxjs/toolkit';
import type { State, OfferProps, Comment, FullOfferProps } from '../../types';
import { StoreSlice, Comprator } from '../../const';
import { getCity, getSorting } from '../site-process/selectors';

export const getIsOffersLoading = ({ [StoreSlice.SiteData]: SITE_DATA }: State): boolean => SITE_DATA.isOffersLoading;
export const getOffers = ({ [StoreSlice.SiteData]: SITE_DATA }: State): OfferProps[] => SITE_DATA.offers;

export const getIsOfferLoading = ({ [StoreSlice.SiteData]: SITE_DATA }: State): boolean => SITE_DATA.isOfferLoading;

export const getOffer = ({ [StoreSlice.SiteData]: SITE_DATA }: State): FullOfferProps | null => SITE_DATA.offer;

export const getNearbyOffers = ({ [StoreSlice.SiteData]: SITE_DATA }: State): OfferProps[] => SITE_DATA.nearbyOffers;
export const getComments = ({ [StoreSlice.SiteData]: SITE_DATA }: State): Comment[] => SITE_DATA.comments;

export const getIsFavoriteOffersLoading = ({ [StoreSlice.SiteData]: SITE_DATA }: State): boolean => SITE_DATA.isFavoriteOffersLoading;
export const getFavoriteOffers = ({ [StoreSlice.SiteData]: SITE_DATA }: State): OfferProps[] => SITE_DATA.favoriteOffers;

export const selectOffers = createSelector(
  [getOffers, getCity, getSorting],
  (offers, city, sorting) => {
    const filteredOffers = offers.filter((offer) => offer.city.name === city.name);
    const comparator = Comprator[sorting as keyof typeof Comprator];
    return filteredOffers.sort(comparator);
  }
);
