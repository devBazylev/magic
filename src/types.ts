import { filters, AuthorizationStatus } from './const';
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
  amount?: number;
  desc?: string;
};

export type User = {
  email: string;
  token: string;
};

export type UserAuth = Pick<User, 'email'> & { password: string };

export type SortName = typeof filters[number];

export type SiteData = {
  cards: CardProps[];
  isCardsLoading: boolean;
  favoritesLocal: number[];
};

export type SiteProcess = {
  sorting: SortName;
  mobile: boolean | null;
  overlay: boolean;
  modal: boolean;
  cart: CardProps[];
};

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  user: User['email'];
  error: string | null;
}
