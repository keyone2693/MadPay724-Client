import { Action } from '@ngrx/store';
import { User } from 'src/app/data/models/user';

export enum LoggedUserActionTypes{
    LOADLOGGEDUSER = '[Logged User] Load',
    LOADLOGGEDUSER_SUCCESS = '[Logged User] Load success',
    LOADLOGGEDUSER_FAIL = '[Logged User] Load Fail',

    EDIT_LOGGEDUSER = '[Logged User] Edit',
    EDIT_LOGGEDUSERPHOTOURL = '[Logged User PhotoUrl] Edit ',
    EDIT_LOGGEDUSERNAME = '[Logged User Name] Edit ',
    RESET_LOGGEDUSER = '[Logged User] Reset',

    UPDATEINFO_LOGGEDUSER = '[Logged User] Update Info',

}
export class LoadLoggedUser implements Action {
    readonly type = LoggedUserActionTypes.LOADLOGGEDUSER;
}
export class LoadLoggedUserSuccess implements Action {
    readonly type = LoggedUserActionTypes.LOADLOGGEDUSER_SUCCESS;
    constructor(public payload: User) { }
}
export class LoadLoggedUserFail implements Action {
    readonly type = LoggedUserActionTypes.LOADLOGGEDUSER_FAIL;
    constructor(public payload: string) { }
}


export class EditLoggedUser implements Action{
    readonly type = LoggedUserActionTypes.EDIT_LOGGEDUSER;
    constructor(public payload: User){}
}
export class ResetLoggedUser implements Action {
    readonly type = LoggedUserActionTypes.RESET_LOGGEDUSER;
}

export class EditLoggedUserPhotoUrl implements Action {
    readonly type = LoggedUserActionTypes.EDIT_LOGGEDUSERPHOTOURL;
    constructor(public payload: string) { }
}
export class EditLoggedUserName implements Action {
    readonly type = LoggedUserActionTypes.EDIT_LOGGEDUSERNAME;
    constructor(public payload: string) { }
}

export class UpdateInfoLoggedUserName implements Action {
    readonly type = LoggedUserActionTypes.UPDATEINFO_LOGGEDUSER;
    constructor(public payload: User) { }
}


export type AllLoggedUserAction =
    EditLoggedUser | ResetLoggedUser | EditLoggedUserPhotoUrl |
    EditLoggedUserName | UpdateInfoLoggedUserName |
    LoadLoggedUser | LoadLoggedUserSuccess | LoadLoggedUserFail ;