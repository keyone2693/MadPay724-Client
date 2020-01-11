import * as fromRouter from '@ngrx/router-store';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { RouterStateUrl } from '../_model/routerStateUrl';
import { AuthTokenState } from '../_model/authTokenState';
import { authTokenReducer } from './authToken.reducers';
import { User } from 'src/app/data/models/user';
import { loggedUserReducer } from './loggedUser.reducers';
import { NotificationStateModel } from '../_model/notificationsStateModel';
import { NotificationReducer } from './notification.reducers';
import { CurrentTitleReducer } from './currentTitle.reducers';
import { CurrentTitleStateModel } from '../_model/currentTitleStateModel';

export interface State {
    router: fromRouter.RouterReducerState<RouterStateUrl>;
    authToken: AuthTokenState,
    loggedUser: User,
    notification: NotificationStateModel,
    currentTitle: CurrentTitleStateModel
}
export const reducers: ActionReducerMap<State> = {
    router: fromRouter.routerReducer,
    authToken: authTokenReducer,
    loggedUser: loggedUserReducer,
    notification: NotificationReducer,
    currentTitle: CurrentTitleReducer
}
