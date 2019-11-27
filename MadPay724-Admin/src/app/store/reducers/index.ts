import * as fromUsers from './users.reducer'
import { ActionReducerMap } from '@ngrx/store'

export interface InfoState{
    users: fromUsers.UserState
}

export const reducers: ActionReducerMap<InfoState> = {
    users: fromUsers.userReducer
}