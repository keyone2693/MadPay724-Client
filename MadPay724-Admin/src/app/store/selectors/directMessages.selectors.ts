import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DirectMessageStateModel } from '../_model/directMessageStateModel';
import { DirectMessageStateContainer } from '../_model/directMessageStateContainer';
import { DirectMessage } from 'src/app/data/models/common/chat/directMessage';
import { UserInfo } from 'src/app/data/models/common/chat/userInfo';


const selectDirectMessageState = (state: DirectMessageStateModel) => state;
const selectDirectMessageStateContainer = (state: DirectMessageStateModel) => state.dm;

const selectDirectMessages = (state: DirectMessageStateContainer) => state.directMessages;
const selectOnlineUsers = (state: DirectMessageStateContainer) => state.onlineUsers;
const selectConnected = (state: DirectMessageStateContainer) => state.connected;


export const getDirectMessageState = createFeatureSelector<DirectMessageStateModel>('directMessage');
export const getDirectMessageStateContainer = createSelector(getDirectMessageState, selectDirectMessageStateContainer);;
export const getDirectMessages = createSelector(getDirectMessageStateContainer, selectDirectMessages);
export const getOnlineUsers = createSelector(getDirectMessageStateContainer, selectOnlineUsers);
export const getConnected = createSelector(getDirectMessageStateContainer, selectConnected);
