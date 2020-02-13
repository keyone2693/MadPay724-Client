import { Action } from '@ngrx/store';
import { UserInfo } from 'src/app/data/models/common/chat/userInfo';

export enum DirectMessagesActionTypes {
    RECEIVED_NEW_ONLINE_USER = '[DirectMessage] Received New Online User',
    RECEIVED_ONLINE_USERS = '[DirectMessage] Received Online Users',

    RECEIVED_USER_LEFT = '[DirectMessage] User Left',

    INIT_HUB = '[DirectMessage] Init Hub',
    INIT_HUB_SUCCESS = '[DirectMessage] Init Hub Success',

    JOIN = '[DirectMessage] Join',
    JOIN_SENT = '[DirectMessage] Join Sent',

    LEAVE = '[DirectMessage] Leave',
    LEAVE_SENT = '[DirectMessage] Leave Sent',

    SEND_DIRECT_MESSAGE = '[DirectMessage] Send Direct Message',
    SEND_DIRECT_MESSAGE_COMPLETE = '[DirectMessage] Send Direct Message Complete',

    RECEIVED_DIRECT_MESSAGE = '[DirectMessage] Received Direct Message',
}


export class SendDirectMessage implements Action {
    readonly type = DirectMessagesActionTypes.SEND_DIRECT_MESSAGE;
    constructor(public message: string, public userId: string) { }
}

export class SendDirectMessageComplete implements Action {
    readonly type = DirectMessagesActionTypes.SEND_DIRECT_MESSAGE_COMPLETE;
    constructor(public message: string, public userId: string) { }
}

export class ReceivedDirectMessage implements Action {
    readonly type = DirectMessagesActionTypes.RECEIVED_DIRECT_MESSAGE;
    constructor(public message: string, public onlineUser: UserInfo) { }
}

export class ReceivedNewOnlineUser implements Action {
    readonly type = DirectMessagesActionTypes.RECEIVED_NEW_ONLINE_USER;
    constructor(public onlineUser: UserInfo) { }
}

export class ReceivedOnlineUsers implements Action {
    readonly type = DirectMessagesActionTypes.RECEIVED_ONLINE_USERS;
    constructor(public onlineUsers: UserInfo[]) { }
}

export class ReceivedUserLeft implements Action {
    readonly type = DirectMessagesActionTypes.RECEIVED_USER_LEFT;
    constructor(public name: string) { }
}

export class Leave implements Action {
    readonly type = DirectMessagesActionTypes.LEAVE;
    constructor() { }
}

export class LeaveSent implements Action {
    readonly type = DirectMessagesActionTypes.LEAVE_SENT;
    constructor() { }
}

export class Join implements Action {
    readonly type = DirectMessagesActionTypes.JOIN;
    constructor() { }
}

export class JoinSent implements Action {
    readonly type = DirectMessagesActionTypes.JOIN_SENT;
    constructor() { }
}

export class InitHub implements Action {
    readonly type = DirectMessagesActionTypes.INIT_HUB;
    constructor() { }
}
export class InitHubSuccess implements Action {
    readonly type = DirectMessagesActionTypes.INIT_HUB_SUCCESS;
    constructor() { }
}


export type AllDirectMessagesAction =
    SendDirectMessageComplete
    | SendDirectMessageComplete
    | ReceivedDirectMessage
    | ReceivedNewOnlineUser
    | ReceivedOnlineUsers
    | ReceivedUserLeft
    | Leave
    | LeaveSent
    | Join
    | JoinSent
    | InitHub
    | InitHubSuccess;