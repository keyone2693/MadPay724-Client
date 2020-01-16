import { Action } from '@ngrx/store';
import { NotificationStateModel } from '../_model/notificationsStateModel';

export enum NotificationActionTypes {
    LOAD_NOTIFICATION = '[Notification] Load',
    LOAD_NOTIFICATION_SUCCESS = '[Notification] Load success',
    LOAD_NOTIFICATION_FAIL = '[Notification] Load Fail',

    INC_UNCLOSEDTICKETCOUNT = '[Ticket] Inc UnClosed Count',
    DEC_UNCLOSEDTICKETCOUNT = '[Ticket] Dec UnClosed Count',
    
    INC_BLOGUNVERIFIEDCOUNT = '[Blog] Inc Unverified Count',
    DEC_BLOGUNVERIFIEDCOUNT = '[Blog] Dec Unverified Count',

    INC_UNCHECKEDENTRY = '[Entry] Inc UnChecked Count',
    DEC_UNCHECKEDENTRY = '[Entry] Dec UnChecked Count',

    INC_UNSPECIFIEDENTRY = '[Entry] Inc UnSpecified Count',
    DEC_UNSPECIFIEDENTRY = '[Entry] Dec UnSpecified Count',

    INC_UNVERIFIEDGATEINPAST7DAYS = '[Gate] Inc UnVerified Count',
    DEC_UNVERIFIEDGATEINPAST7DAYS = '[Gate] Dec UnVerified Count',

    INC_UNVERIFIEDBANKCARDINPAST7DAYS = '[BankCard] Inc UnVerified Count',
    DEC_UNVERIFIEDBANKCARDINPAST7DAYS = '[BankCard] Dec UnVerified Count',

    INC_UNVERIFIEDDOCUMENTS = '[Document] Inc UnVerified Count',
    DEC_UNVERIFIEDDOCUMENTS = '[Document] Dec UnVerified Count',
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
//Blog
export class IncUnverifiedBlogCount implements Action {
    readonly type = NotificationActionTypes.INC_BLOGUNVERIFIEDCOUNT;
}
export class DecUnverifiedBlogCount implements Action {
    readonly type = NotificationActionTypes.DEC_BLOGUNVERIFIEDCOUNT;
}
//Ticket
export class IncUnClosedTicketCount implements Action {
    readonly type = NotificationActionTypes.INC_UNCLOSEDTICKETCOUNT;
}
export class DecUnClosedTicketCount implements Action {
    readonly type = NotificationActionTypes.DEC_UNCLOSEDTICKETCOUNT;
}
//CheckedEntry
export class IncUnCheckedEntryCount implements Action {
    readonly type = NotificationActionTypes.INC_UNCHECKEDENTRY;
}
export class DecUnCheckedEntryCount implements Action {
    readonly type = NotificationActionTypes.DEC_UNCHECKEDENTRY;
}
//SpecifiedEntry
export class IncUnSpecifiedEntryCount implements Action {
    readonly type = NotificationActionTypes.INC_UNSPECIFIEDENTRY ;
}
export class DecUnSpecifiedEntryCount implements Action {
    readonly type = NotificationActionTypes.DEC_UNSPECIFIEDENTRY ;
}
//Gate
export class IncUnVerifiedGateCount implements Action {
    readonly type = NotificationActionTypes.INC_UNVERIFIEDGATEINPAST7DAYS;
}
export class DecUnVerifiedGateCount implements Action {
    readonly type = NotificationActionTypes.DEC_UNVERIFIEDGATEINPAST7DAYS;
}
//BankCard
export class IncUnVerifiedBankCardCount implements Action {
    readonly type = NotificationActionTypes.INC_UNVERIFIEDBANKCARDINPAST7DAYS;
}
export class DecUnVerifiedBankCardCount implements Action {
    readonly type = NotificationActionTypes.DEC_UNVERIFIEDBANKCARDINPAST7DAYS;
}
//Document
export class IncUnVerifiedDocumentCount implements Action {
    readonly type = NotificationActionTypes.INC_UNVERIFIEDDOCUMENTS;
}
export class DecUnVerifiedDocumentCount implements Action {
    readonly type = NotificationActionTypes.DEC_UNVERIFIEDDOCUMENTS;
}
export type AllNotificationActoions =
    | IncUnverifiedBlogCount | DecUnverifiedBlogCount
    | LoadNotification | LoadNotificationSuccess | LoadNotificationFail
    | IncUnClosedTicketCount | DecUnClosedTicketCount
    | IncUnCheckedEntryCount | DecUnCheckedEntryCount
    | IncUnSpecifiedEntryCount | DecUnSpecifiedEntryCount
    | IncUnVerifiedGateCount | DecUnVerifiedGateCount
    | IncUnVerifiedBankCardCount | DecUnVerifiedBankCardCount
    | IncUnVerifiedDocumentCount | DecUnVerifiedDocumentCount;
