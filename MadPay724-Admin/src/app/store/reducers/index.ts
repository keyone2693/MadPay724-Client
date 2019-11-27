import * as fromUsers from './users.reducer'
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store'

export interface InfoState{
    users: fromUsers.UserState
}

export const reducers: ActionReducerMap<InfoState> = {
    users: fromUsers.userReducer
}

export const getInfoState = createFeatureSelector<InfoState>('info');

export const getUserState = createSelector(getInfoState, (state: InfoState) => state.users);

export const getAllUsers = createSelector(getUserState, fromUsers.getUsers);
export const getUsersLoaded = createSelector(getUserState, fromUsers.getUsersLoaded);
export const getUsersLoading = createSelector(getUserState, fromUsers.getUsersLoading);
