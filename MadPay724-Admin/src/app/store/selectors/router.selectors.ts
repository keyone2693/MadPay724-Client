import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { RouterStateUrl } from '../_model/routerStateUrl';
import { AuthTokenState } from '../_model/authTokenState';
import { User } from 'src/app/data/models/user';

//-----------------------Router----------------------------
export const getRouterParamas =
    (state: fromRouter.RouterReducerState<RouterStateUrl>) => state.state.params;
export const getRouterQueryParams =
    (state: fromRouter.RouterReducerState<RouterStateUrl>) => state.state.queryParams;
export const getRouterUrl =
    (state: fromRouter.RouterReducerState<RouterStateUrl>) => state.state.url;
export const getRouterNavigationId =
    (state: fromRouter.RouterReducerState<RouterStateUrl>) => state.navigationId;

export const getRouterState = createFeatureSelector
    <fromRouter.RouterReducerState<RouterStateUrl>>('routerReducer');

export const getRouterParamasState = createSelector(getRouterState,
    getRouterParamas);

export const getRouterQueryParamsState = createSelector(getRouterState,
    getRouterQueryParams);

export const getRouterUrlState = createSelector(getRouterState,
    getRouterUrl);

       //-----------------------AuthToken----------------------------
export const selectDecodedToken = (state: AuthTokenState) => state.decodedToken;

export const getAuthTokenState = createFeatureSelector<AuthTokenState>('authToken');
export const getDecodedToken = createSelector(getAuthTokenState,selectDecodedToken);

    //-----------------------LoggedUser----------------------------
export const selectLoggedUserName = (state: User) => state.name;
export const selectLoggedUserPhotoUrl = (state: User) => state.phoneNumber;

export const getLoggedUserState = createFeatureSelector<User>('loggedUser');
export const getLoggedUserName = createSelector(getLoggedUserState, selectLoggedUserName);
export const getLoggedUserPhotoUrl = createSelector(getLoggedUserState, selectLoggedUserPhotoUrl);