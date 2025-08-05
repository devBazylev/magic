export const filters = ['Expensive', 'Cheap', 'Rare', 'Common'] as const;
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
  GET_DATA = '/magic',
  REGISTER = '/register',
  LOGIN = '/auth',
  LOGOUT = '/logout',
  USERS = '/users',
  NOT_FOUND = '/404',
}

export const Comprator = {
  'Popular': () => 0,
  'Expensive': (a: { price: number }, b: { price: number }) => a.price - b.price,
  'Cheap': (a: { price: number }, b: { price: number }) => b.price - a.price,
  'Rare': (a: { rating: number }, b: { rating: number }) => b.rating - a.rating,
  'Common': (a: { rating: number }, b: { rating: number }) => b.rating - a.rating,
} as const;
