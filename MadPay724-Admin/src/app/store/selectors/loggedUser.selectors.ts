import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from 'src/app/data/models/user';

export const selectLoggedUserName = (state: User) => state.name;
export const selectLoggedUserPhotoUrl = (state: User) => state.phoneNumber;

export const getLoggedUserState = createFeatureSelector<User>('loggedUser');
export const getLoggedUserName = createSelector(getLoggedUserState, selectLoggedUserName);
export const getLoggedUserPhotoUrl = createSelector(getLoggedUserState, selectLoggedUserPhotoUrl);