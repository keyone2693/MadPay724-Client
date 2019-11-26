import { Action } from '@ngrx/store';

export const EDIT_TITLE = '[Title] Edit';
export const INCREASECOUNTER = '[Counter] Increase Counter';
export const DECREASECOUNTER = '[Counter] Decrease Counter';
export const RESETCOUNTER = '[Counter] Reset Counter';

export class EditTitle implements Action {
    readonly type = EDIT_TITLE;
    constructor (public payload: String) {}
}

export class IncreaseCounter implements Action {
    readonly type = INCREASECOUNTER;
    constructor() { }
}
export class DecreaseCounter implements Action {
    readonly type = DECREASECOUNTER;
    constructor() { }
}
export class ResetCounter implements Action {
    readonly type = RESETCOUNTER;
    constructor() { }
}

export type All = EditTitle | IncreaseCounter | DecreaseCounter | ResetCounter;