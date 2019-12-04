import { Action } from '@ngrx/store';
import { DecodedToken } from '../_model/decodedToken';


export enum AuthTokenActionTypes {
    EDIT_DECODEDTOKEN = '[DecodedToken] Edit',
    RESET_DECODEDTOKEN = '[DecodedToken] Reset',
}

export class EditDecodedToken implements Action{
    readonly type = AuthTokenActionTypes.EDIT_DECODEDTOKEN;
    constructor(public payload: DecodedToken){}
}
export class ResetDecodedToken implements Action {
    readonly type = AuthTokenActionTypes.RESET_DECODEDTOKEN;
}

export type AllAuthTokenAction = EditDecodedToken | ResetDecodedToken;