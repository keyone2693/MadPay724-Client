import { Action } from '@ngrx/store';
import { User } from 'src/app/data/models/user';

export enum LoggedUserActionTypes{
    EDIT_LOGGEDUSER = '[Logged User] Edit',
    RESET_LOGGEDUSER = '[Logged User] Reset'
}

export class EditLoggedUser implements Action{
    readonly type = LoggedUserActionTypes.EDIT_LOGGEDUSER;
    constructor(public payload: User){}
}
export class ResetLoggedUser implements Action {
    readonly type = LoggedUserActionTypes.RESET_LOGGEDUSER;
}

export type AllLoggedUserAction = EditLoggedUser | ResetLoggedUser;