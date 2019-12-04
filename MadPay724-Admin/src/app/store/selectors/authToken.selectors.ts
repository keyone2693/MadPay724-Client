import { AuthTokenState } from '../_model/authTokenState';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DecodedToken } from '../_model/decodedToken';

export const selectDecodedToken = (state: AuthTokenState) => state.decodedToken;
export const selectUserRoles = (state: DecodedToken) => state.role;
export const selectUserId = (state: DecodedToken) => state.nameid;

export const getAuthTokenState = createFeatureSelector<AuthTokenState>('authToken');
export const getDecodedToken = createSelector(getAuthTokenState, selectDecodedToken);
export const getUserRoles = createSelector(getDecodedToken, selectUserRoles);
export const getUserId = createSelector(getDecodedToken, selectUserId);