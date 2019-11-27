import { User } from 'src/app/data/models/user';
import * as UserAction from './users.action';

export type Action = UserAction.All;

export interface UserState{
    data: User[],
    loaded: boolean,
    loading: boolean
}

const userInit = [{
    id: 'string',
    name: 'string',
    userName: 'string',
    phoneNumber: 'string',
    address: 'string',
    gender: true,
    age: 15,
    lastActive: new Date(),
    city: 'string',
    photoUrl: 'string'
}]

export const defaultState: UserState ={
    data: [],
    loaded: false,
    loading: false
}

export function userReducer(state = defaultState, action: Action) {
    switch (action.type) {
        case UserAction.LOAD_USERS:
            return { ...state, loading: true };
        case UserAction.LOAD_USERS_SUCCESS:
            return { ...state, loading: false, loaded:true };
        case UserAction.LOAD_USERS_FAIL:
            return { ...state, loading: false, loaded: false };
    }
}