import { User } from 'src/app/data/models/user';
import * as UserAction from '../actions/users.action';

export type Action = UserAction.All;

export interface UserState{
    data: User[],
    loaded: boolean,
    loading: boolean
}

export const defaultState: UserState ={
    data: [],
    loaded: false,
    loading: false
}

export function userReducer(state = defaultState, action: Action) {
    switch (action.type) {
        case UserAction.LOAD_USERS:
            return { ...state, loading: true };
        case UserAction.LOAD_USERS_SUCCESS: {
            const data = action.payload;
            return { ...state, data, loading: false, loaded:true };

        }
        case UserAction.LOAD_USERS_FAIL:
            return { ...state, loading: false, loaded: false };
        default:
            return state;
    }
}

export const getUsersLoading = (state: UserState) => state.loading;
export const getUsersLoaded = (state: UserState) => state.loaded;
export const getUsers = (state: UserState) => state.data;