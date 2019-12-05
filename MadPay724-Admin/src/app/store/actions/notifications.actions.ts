import { Action } from '@ngrx/store';

export enum NotificationActionTypes {
    LOADBLOGUNVERIFIEDCOUNT = '[Blog] Load Unverified Count',
    LOADBLOGUNVERIFIEDCOUNT_SUCCESS = '[Blog] Load Unverified Count success',
    LOADBLOGUNVERIFIEDCOUNT_FAIL = '[Blog] Load Unverified Count Fail',
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

export type AllNotificationActoions =
    LoadUnverifiedBlogCount |
    LoadUnverifiedBlogCountSuccess |
    LoadUnverifiedBlogCountFail;
