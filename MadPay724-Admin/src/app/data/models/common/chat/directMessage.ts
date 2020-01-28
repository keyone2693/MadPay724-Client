import { UserInfo } from './userInfo';

export interface DirectMessage {
    fromOnlineUser: UserInfo | null;
    message: string;
}
