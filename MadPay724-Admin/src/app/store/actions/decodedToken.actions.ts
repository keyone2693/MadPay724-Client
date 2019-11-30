import { Action } from '@ngrx/store';


export enum DecodedTokenActionTypes {
    EDIT_DECODEDTOKEN = '[DecodedToken] Edit',
    RESET_DECODEDTOKEN = '[DecodedToken] Reset'
}

export class EditDecodedToken implements Action{
    readonly type = DecodedTokenActionTypes.EDIT_DECODEDTOKEN;
    constructor(public payload: string){}
}
export class ResetDecodedToken implements Action {
    readonly type = DecodedTokenActionTypes.RESET_DECODEDTOKEN;
}

export type AllDecodedTokenAction = EditDecodedToken | ResetDecodedToken;