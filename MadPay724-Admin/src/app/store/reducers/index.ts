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

export const getAllUsersEntities = createSelector(getUserState,
    fromUsers.usersAdaptor.getSelectors().selectEntities);

export const getAllUsers = createSelector(getUserState,
    fromUsers.usersAdaptor.getSelectors().selectAll);

export const getUsersLoaded = createSelector(getUserState, fromUsers.getUsersLoaded);
export const getUsersLoading = createSelector(getUserState, fromUsers.getUsersLoading);
export const getUsersError = createSelector(getUserState, fromUsers.getUsersError);

export const getSelectedUserId = createSelector(getUserState,
    fromUsers.getSelectedUserId);

export const getSelectedUser = createSelector(getUserState,
    getSelectedUserId,
    fromUsers.getSelectedUserId,
    state => state.entities[state.selectedUserId]);
