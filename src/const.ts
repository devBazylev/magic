import { Location, CityName } from './types';

export const filters = ['Expensive', 'Cheap', 'Rare', 'Common'] as const;
export const cities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'] as const;
export const sortingValues = ['Popular', 'Price: low to high', 'Price: high to low', 'Top rated first'];

export enum StoreSlice {
  SiteData = 'SITE_DATA',
  SiteProcess = 'SITE_PROCESS',
  UserProcess = 'USER_PROCESS',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Tavern = '/tavern',
  Quests = '/quests',
  Inventory = '/inventory',
}

export enum APIRoute {
  Offers = '/hotels',
  Comments = '/comments',
  Favorite = '/favorite',
  Login = '/login',
  Logout = '/logout',
  NotFound = '/404'
}

export const CityLocation: { [key in CityName]: Location } = {
  'Paris': {
    latitude: 48.85661,
    longitude: 2.351499,
    zoom: 13
  },
  'Cologne': {
    latitude: 50.938361,
    longitude: 6.959974,
    zoom: 13
  },
  'Brussels': {
    latitude: 50.846557,
    longitude: 4.351697,
    zoom: 13
  },
  'Amsterdam': {
    latitude: 52.37454,
    longitude: 4.897976,
    zoom: 13
  },
  'Hamburg': {
    latitude: 53.550341,
    longitude: 10.000654,
    zoom: 13
  },
  'Dusseldorf': {
    latitude: 51.225402,
    longitude: 6.776314,
    zoom: 13
  },
};

export const Comprator = {
  'Popular': () => 0,
  'Price: low to high': (a: { price: number }, b: { price: number }) => a.price - b.price,
  'Price: high to low': (a: { price: number }, b: { price: number }) => b.price - a.price,
  'Top rated first': (a: { rating: number }, b: { rating: number }) => b.rating - a.rating,
} as const;
