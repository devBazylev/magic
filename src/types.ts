import { sortingValues, AuthorizationStatus } from './const';
import { store } from './store/store';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type CardProps = {
  id: number;
  name: string;
  alt: string;
  price: number;
  tag: string;
  image: string;
  fav?: boolean;
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

export type SortName = typeof sortingValues[number];

export type SiteData = {
  cards: CardProps[];
  isCardsLoading: boolean;
};

export type SiteProcess = {
  sorting: SortName;
  mobile: boolean | null;
};

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  user: User['email'];
}
