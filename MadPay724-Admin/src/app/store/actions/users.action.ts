import { Action } from '@ngrx/store';
import { User } from 'src/app/data/models/user';
import { Update } from '@ngrx/entity';


export const LOAD_USERS = '[Users] Load Users';
export const LOAD_USERS_SUCCESS = '[Users] Load Users Success';
export const LOAD_USERS_FAIL = '[Users] Load Users Fail';
export const LOAD_USER = '[Users] Load User';
export const LOAD_USER_SUCCESS = '[Users] Load User Success';
export const LOAD_USER_FAIL = '[Users] Load User Fail';
export const CREATE_USER = '[Users] Create User';
export const CREATE_USER_SUCCESS = '[Users] Create User Success';
export const CREATE_USER_FAIL = '[Users] Create User Fail';
export const UPDATE_USER = '[Users] Update User';
export const UPDATE_USER_SUCCESS = '[Users] Update User Success';
export const UPDATE_USER_FAIL = '[Users] Update User Fail';
export const DELETE_USER = '[Users] Delete User';
export const DELETE_USER_SUCCESS = '[Users] Delete User Success';
export const DELETE_USER_FAIL = '[Users] Delete User Fail';

//LoadUsers
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
//LoadUser
export class LoadUser implements Action {
    readonly type = LOAD_USER;
    constructor(public payload: string) { }
}
export class LoadUserSuccess implements Action {
    readonly type = LOAD_USER_SUCCESS;
    constructor(public payload: User) { }
}
export class LoadUserFail implements Action {
    readonly type = LOAD_USER_FAIL;
    constructor(public payload: any) { }
}
//CreateUser
export class CreateUser implements Action {
    readonly type = CREATE_USER;
    constructor(public payload: User) { }
}
export class CreateUserSuccess implements Action {
    readonly type = CREATE_USER_SUCCESS;
    constructor(public payload: User) { }
}
export class CreateUserFail implements Action {
    readonly type = CREATE_USER_FAIL;
    constructor(public payload: any) { }
}
//UpdateUser
export class UpdateUser implements Action {
    readonly type = UPDATE_USER;
    constructor(public payload: User) { }
}
export class UpdateUserSuccess implements Action {
    readonly type = UPDATE_USER_SUCCESS;
    constructor(public payload: Update<User>) { }
}
export class UpdateUserFail implements Action {
    readonly type = UPDATE_USER_FAIL;
    constructor(public payload: any) { }
}
//DeleteUser
export class DeleteUser implements Action {
    readonly type = DELETE_USER;
    constructor(public payload: string) { }
}
export class DeleteUserSuccess implements Action {
    readonly type = DELETE_USER_SUCCESS;
    constructor(public payload: string) { }
}
export class DeleteUserFail implements Action {
    readonly type = DELETE_USER_FAIL;
    constructor(public payload: any) { }
}




export type All = LoadUsers | LoadUsersSuccess | LoadUsersFail|
LoadUser | LoadUserSuccess | LoadUserFail |
CreateUser | CreateUserSuccess | CreateUserFail |
UpdateUser | UpdateUserSuccess | UpdateUserFail |
DeleteUser | DeleteUserSuccess | DeleteUserFail;