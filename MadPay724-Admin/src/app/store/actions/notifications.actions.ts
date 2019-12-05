import { Action } from '@ngrx/store';
import { NotificationStateModel } from '../_model/notificationsStateModel';

export enum NotificationActionTypes {
    LOAD_NOTIFICATION = '[Notification] Load',
    LOAD_NOTIFICATION_SUCCESS = '[Notification] Load success',
    LOAD_NOTIFICATION_FAIL = '[Notification] Load Fail',

    INC_BLOGUNVERIFIEDCOUNT = '[Blog] Inc Unverified Count',
    DEC_USDBLOGUNVERIFIEDCOUNT = '[Blog] Dec Unverified Count',
}

export class LoadNotification implements Action {
    readonly type = NotificationActionTypes.LOAD_NOTIFICATION;
}
export class LoadNotificationSuccess implements Action {
    readonly type = NotificationActionTypes.LOAD_NOTIFICATION_SUCCESS;
    constructor(public payload: NotificationStateModel) { }
}
export class LoadNotificationFail implements Action {
    readonly type = NotificationActionTypes.LOAD_NOTIFICATION_FAIL;
    constructor(public payload: string) { }
}

export class IncUnverifiedBlogCount implements Action {
    readonly type = NotificationActionTypes.INC_BLOGUNVERIFIEDCOUNT;
}
export class DecUnverifiedBlogCount implements Action {
    readonly type = NotificationActionTypes.DEC_USDBLOGUNVERIFIEDCOUNT;
}

export type AllNotificationActoions =
    | IncUnverifiedBlogCount | DecUnverifiedBlogCount
    | LoadNotification | LoadNotificationSuccess |LoadNotificationFail;
