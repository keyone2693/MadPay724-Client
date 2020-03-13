import { UserInfo } from './userInfo';

export interface DirectMessage {
    fromOnlineUser: UserInfo;
    message: string;
    date: Date;
    isRead: boolean;
}
