import { UserInfo } from 'src/app/data/models/common/chat/userInfo';
import { DirectMessage } from 'src/app/data/models/common/chat/directMessage';

export interface DirectMessageStateContainer {
    onlineUsers: UserInfo[],
    directMessages: DirectMessage[],
    connected: boolean
}
