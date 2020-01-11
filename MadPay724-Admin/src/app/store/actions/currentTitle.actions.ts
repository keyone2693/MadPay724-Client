import { Action } from '@ngrx/store';
import { CurrentTitleStateModel } from '../_model/currentTitleStateModel';

export enum CurrentTitleActionTypes{
    EDIT_CURRENTTTITLE = '[Current Title] Edit',
    RESET_CURRENTTITLE = '[Current Title] Reset'
}

export class EditCurrentTitle implements Action{
    readonly type = CurrentTitleActionTypes.EDIT_CURRENTTTITLE;
    constructor(public payload: CurrentTitleStateModel){}
}

export class ResetCurrentTitle implements Action {
    readonly type = CurrentTitleActionTypes.RESET_CURRENTTITLE;
}

export type AllCurrentTitleActios = EditCurrentTitle | ResetCurrentTitle;