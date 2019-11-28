import { User } from 'src/app/data/models/user';
import * as UserAction from '../actions/users.action';
import { createEntityAdapter, EntityState, EntityAdapter } from '@ngrx/entity'

export type Action = UserAction.All;

export interface UserState extends EntityState<User> {
    selectedUserId: string | null,
    loaded: boolean,
    loading: boolean,
    error: string
}
export const usersAdaptor: EntityAdapter<User> = createEntityAdapter<User>();

export const defaultUser: UserState = {
    ids: [],
    entities: {},
    selectedUserId: null,
    loaded: false,
    loading: false,
    error: ''
}

export const initState = usersAdaptor.getInitialState(defaultUser);



export function userReducer(state = initState, action: Action) {
    switch (action.type) {
        case UserAction.LOAD_USERS:
            return { ...state, loading: true };
        case UserAction.LOAD_USERS_SUCCESS: {
            return usersAdaptor.addAll(action.payload, {
                ...state,
                loading: false,
                loaded: true
            });
        }
        case UserAction.LOAD_USERS_FAIL:
            return { ...state, entities: {}, loading: false, loaded: false,error : action.payload };
        default:
            return state;
    }
}

export const getUsersEntities = (state: UserState) => state.entities;
export const getUsersLoading = (state: UserState) => state.loading;
export const getUsersLoaded = (state: UserState) => state.loaded;
export const getUsersError = (state: UserState) => state.error;
