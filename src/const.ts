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
  Offers = '/hotels',
  Comments = '/comments',
  Favorite = '/favorite',
  Login = '/login',
  Logout = '/logout',
  NotFound = '/404'
}

export const Comprator = {
  'Popular': () => 0,
  'Price: low to high': (a: { price: number }, b: { price: number }) => a.price - b.price,
  'Price: high to low': (a: { price: number }, b: { price: number }) => b.price - a.price,
  'Top rated first': (a: { rating: number }, b: { rating: number }) => b.rating - a.rating,
} as const;
