import { ChangeEvent } from 'react';
import { cities, sortingValues, AuthorizationStatus } from './const';
import { store } from './store/store';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type CityName = typeof cities[number];

export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type City = {
  name: CityName;
  location?: Location;
};

export type MapProps = {
  city: City;
  location: Location[];
};

export type OfferProps = {
  id: number;
  isPremium: boolean;
  previewImage: string;
  price: number;
  isMarked: boolean;
  rating: number;
  description: string;
  type: 'apartment' | 'room' | 'house' | 'hotel';
  city: City;
  onMouseMove?: () => void;
  onMouseLeave?: () => void;
  location: Location;
  isFavorite: boolean;
};

export type FullOfferProps = OfferProps & {
  title: string;
  isFavorite: boolean;
  bedrooms: number;
  maxAdults: number;
  goods: string[];
  images: string[];
  host: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
};

export type Comment = {
  id: string | undefined;
  comment: string;
  rating: number;
  date: string;
  user: {
    avatarUrl: string;
    id: number;
    isPro: boolean;
    name: string;
  };
};

export type User = {
    id: number;
    name: string;
    avatarUrl: string;
    isPro: boolean;
    email: string;
    token: string;
};

export type UserAuth = Pick<User, 'email'> & { password: string };

export type CommentAuth = Pick<Comment, 'comment' | 'rating'> & Pick<FullOfferProps, 'id'>;

export type FavoriteAuth = Pick<FullOfferProps, 'id'> & { status: 1 | 0 };

export type CardListProps = {
  cards: OfferProps[];
};

export type OfferForm = {
  rating: number | null;
  text: string;
  onChange?: (evt: ChangeEvent<HTMLTextAreaElement>) => void;
  onRatingChange?: (rating: number) => void;
  onSubmit?: (evt: React.FormEvent) => void;
};

export type SortName = typeof sortingValues[number];

export type SiteData = {
    offers: OfferProps[];
    isOffersLoading: boolean;
    offer: FullOfferProps | null;
    isOfferLoading: boolean;
    nearbyOffers: OfferProps[];
    comments: Comment[];
    favoriteOffers: OfferProps[];
    isFavoriteOffersLoading: boolean;
};

export type SiteProcess = {
    city: City;
    sorting: SortName;
};

export type UserProcess = {
    authorizationStatus: AuthorizationStatus;
    user: User['email'];
}
