import { Action } from '@ngrx/store';
import { User } from 'src/app/data/models/user';


export const LOAD_USERS = '[Uaers] Load Users';
export const LOAD_USERS_SUCCESS = '[Uaers] Load Users Success';
export const LOAD_USERS_FAIL = '[Uaers] Load Users Fail';

export class LoadUsers implements Action{
    readonly type = LOAD_USERS;
}
export class LoadUsersSuccess implements Action {
    readonly type = LOAD_USERS_SUCCESS;
    constructor(public payload: User[]) { }
}
export class LoadUsersFail implements Action {
    readonly type = LOAD_USERS_FAIL;
    constructor(public payload: any) { }
}

export type All = LoadUsers | LoadUsersSuccess | LoadUsersFail;