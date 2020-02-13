import { DirectMessageStateModel } from '../_model/directMessageStateModel';
import * as directMessageAction from '../actions';
import { DirectMessage } from 'src/app/data/models/common/chat/directMessage';


export const initDirectMessage: DirectMessageStateModel = {
    dm: {
        onlineUsers: [],
        directMessages: [],
        connected: false
    }
}


export function DirectMessageReducer(state = initDirectMessage,
    action: directMessageAction.AllDirectMessagesAction) {
    switch (action.type) {
        case directMessageAction.DirectMessagesActionTypes.INIT_HUB: {
            return state;
        }
        case directMessageAction.DirectMessagesActionTypes.INIT_HUB_SUCCESS: {
            return state;
        }
        case directMessageAction.DirectMessagesActionTypes.RECEIVED_DIRECT_MESSAGE: {
            const directMessage: DirectMessage = {
                message: action.message,
                fromOnlineUser: action.onlineUser
            };
            return Object.assign({}, state, {
                dm: {
                    onlineUsers: state.dm.onlineUsers,
                    directMessages: state.dm.directMessages.concat(directMessage),
                    connected: state.dm.connected
                }
            });
        }
        case directMessageAction.DirectMessagesActionTypes.RECEIVED_USER_LEFT: {
            const index = state.dm.onlineUsers.findIndex(o => o.userName === action.name);
            const list = [...state.dm.onlineUsers];
            list.splice(index, 1);
            return Object.assign({}, state, {
                dm: {
                    onlineUsers: list,
                    directMessages: state.dm.directMessages,
                    connected: state.dm.connected
                }
            });
        }
        case directMessageAction.DirectMessagesActionTypes.SEND_DIRECT_MESSAGE_COMPLETE: {
            const directMessage: DirectMessage = {
                message: action.message,
                fromOnlineUser : {
                    userName: action.userId,
                    connectionId: '-1'
                } 
            };
            return Object.assign({}, state, {
                dm: {
                    onlineUsers: state.dm.onlineUsers,
                    directMessages: state.dm.directMessages.concat(directMessage),
                    connected: state.dm.connected
                }
            });
        }
        case directMessageAction.DirectMessagesActionTypes.RECEIVED_NEW_ONLINE_USER: {
            if (state.dm.onlineUsers
                .some(el => el.userName === action.onlineUser.userName)) {
                return Object.assign({}, state, {
                    dm: {
                        onlineUsers: state.dm.onlineUsers,
                        directMessages: state.dm.directMessages,
                        connected: state.dm.connected
                    }
                })
            } else {
                return Object.assign({}, state, {
                    dm: {
                        onlineUsers: state.dm.onlineUsers.concat(action.onlineUser),
                        directMessages: state.dm.directMessages,
                        connected: state.dm.connected
                    }
                })
            }

        }
        case directMessageAction.DirectMessagesActionTypes.RECEIVED_ONLINE_USERS: {
            return Object.assign({}, state, {
                dm: {
                    onlineUsers: action.onlineUsers,
                    directMessages: state.dm.directMessages,
                    connected: state.dm.connected
                }
            });            
        }
        case directMessageAction.DirectMessagesActionTypes.JOIN_SENT: {
            return Object.assign({}, state, {
                dm: {
                    onlineUsers: state.dm.onlineUsers,
                    directMessages: state.dm.directMessages,
                    connected: true
                }
            });
        }
        case directMessageAction.DirectMessagesActionTypes.LEAVE_SENT: {
            return Object.assign({}, state, {
                dm: {
                    onlineUsers: state.dm.onlineUsers,
                    directMessages: state.dm.directMessages,
                    connected: false
                }
            });
        }
        default:
            return state;
    }
}