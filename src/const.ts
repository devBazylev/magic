export const filters = ['popular','expensive', 'cheap', 'rare'] as const;

export enum BackPath {
  Root = 'main',
  Login = 'gate',
  Favorites = 'couple',
  Error = 'volcano',
}

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
  Tavern = '/tavern',
  Quests = '/quests',
  Inventory = '/inventory',
  Login = '/login',
  Favorites = '/favorites',
}

export enum APIRoute {
  GET_DATA = '/magic',
  REGISTER = '/register',
  LOGIN = '/users',
  LOGOUT = '/logout',
  AUTH = '/auth',
  AUTH_ME = '/auth_me',
  NOT_FOUND = '/404',
}

export const comprator = {
  'popular': () => 0,
  'cheap': (a: { price: number }, b: { price: number }) => a.price - b.price,
  'expensive': (a: { price: number }, b: { price: number }) => b.price - a.price,
  'rare': (a: { tag: string }, b: { tag: string }) => {
    const aHasRare = a.tag.includes('artefact') ? 0 : 1;
    const bHasRare = b.tag.includes('artefact') ? 0 : 1;
    return aHasRare - bHasRare;
  },
} as const;

export const labels = [
  {name: 'items', id: 'item', text: 'Magic items', checked: true},
  {name: 'weapons', id: 'weapon', text: 'Weapons', checked: true},
  {name: 'elixirs', id: 'elixir', text: 'Elixirs', checked: true},
  {name: 'artefacts', id: 'artefact', text: 'Artefacts', checked: true},
  {name: 'armors', id: 'armor', text: 'Armors', checked: true},
] as const;
