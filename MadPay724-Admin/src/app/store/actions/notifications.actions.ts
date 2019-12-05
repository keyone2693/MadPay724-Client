import { Action } from '@ngrx/store';

export enum NotificationActionTypes {
    LOADBLOGUNVERIFIEDCOUNT = '[Blog] Load Unverified Count',
    LOADBLOGUNVERIFIEDCOUNT_SUCCESS = '[Blog] Load Unverified Count success',
    LOADBLOGUNVERIFIEDCOUNT_FAIL = '[Blog] Load Unverified Count Fail',

    INC_BLOGUNVERIFIEDCOUNT = '[Blog] Inc Unverified Count',
    DEC_USDBLOGUNVERIFIEDCOUNT = '[Blog] Dec Unverified Count',
}

export class LoadUnverifiedBlogCount implements Action {
    readonly type = NotificationActionTypes.LOADBLOGUNVERIFIEDCOUNT;
}
export class LoadUnverifiedBlogCountSuccess implements Action {
    readonly type = NotificationActionTypes.LOADBLOGUNVERIFIEDCOUNT_SUCCESS;
    constructor(public payload: number) { }
}
export class LoadUnverifiedBlogCountFail implements Action {
    readonly type = NotificationActionTypes.LOADBLOGUNVERIFIEDCOUNT_FAIL;
    constructor(public payload: string) { }
}

export class IncUnverifiedBlogCount implements Action {
    readonly type = NotificationActionTypes.INC_BLOGUNVERIFIEDCOUNT;
}
export class DecUnverifiedBlogCount implements Action {
    readonly type = NotificationActionTypes.DEC_USDBLOGUNVERIFIEDCOUNT;
}

export type AllNotificationActoions =
    LoadUnverifiedBlogCount |
    LoadUnverifiedBlogCountSuccess |
    LoadUnverifiedBlogCountFail | IncUnverifiedBlogCount | DecUnverifiedBlogCount;
