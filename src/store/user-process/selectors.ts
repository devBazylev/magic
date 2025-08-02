import { AuthorizationStatus, StoreSlice } from '../../const';
import type { State, User } from '../../types';

export const getAuthorizationStatus = ({ [StoreSlice.UserProcess]: USER_PROCESS }: State): AuthorizationStatus => USER_PROCESS.authorizationStatus;
export const getUser = ({ [StoreSlice.UserProcess]: USER_PROCESS }: State): User['email'] => USER_PROCESS.user;
