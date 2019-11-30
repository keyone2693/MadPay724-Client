import { Action } from '@ngrx/store';
import { User } from 'src/app/data/models/user';

export enum LoggedUserActionTypes{
    EDIT_LOGGEDUSER = '[Logged User] Edit',
    RESET_LOGGEDUSER = '[Logged User] Reset',
    EDIT_LOGGEDUSERPHOTOURL = '[Logged User PhotoUrl] Edit ',
    EDIT_LOGGEDUSERNAME = '[Logged User Name] Edit '
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


export type AllLoggedUserAction =
    EditLoggedUser | ResetLoggedUser | EditLoggedUserPhotoUrl | EditLoggedUserName;