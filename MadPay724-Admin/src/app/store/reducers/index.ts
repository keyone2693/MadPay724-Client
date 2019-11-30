import * as fromRouter from '@ngrx/router-store';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { RouterStateUrl } from '../_model/routerStateUrl';
import { AuthTokenState } from '../_model/authTokenState';
import { authTokenReducer } from './authToken.reducers';

export interface State {
    routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
    authToken: AuthTokenState
}
export const reducers: ActionReducerMap<State> = {
    routerReducer: fromRouter.routerReducer,
    authToken: authTokenReducer
}
