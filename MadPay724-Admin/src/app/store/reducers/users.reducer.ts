import { User } from 'src/app/data/models/user';
import * as UserAction from '../actions/users.action';

export type Action = UserAction.All;

export interface UserState{
    entities: { [id:number]: User },
    loaded: boolean,
    loading: boolean
}

export const defaultState: UserState ={
    entities: {},
    loaded: false,
    loading: false
}

export function userReducer(state = defaultState, action: Action) {
    switch (action.type) {
        case UserAction.LOAD_USERS:
            return { ...state, loading: true };
        case UserAction.LOAD_USERS_SUCCESS: {

            const users = action.payload;

            const entities = users.reduce((enties: { [id: number]: User }, user: User) => {
                return {
                    ...enties, [user.id]: user
                }
            },
                {
                    ...state.entities
                }
            );

            return { ...state, entities, loading: false, loaded:true };

        }
        case UserAction.LOAD_USERS_FAIL:
            return { ...state, loading: false, loaded: false };
        default:
            return state;
    }
}

export const getUsersEntities = (state: UserState) => state.entities;
export const getUsersLoading = (state: UserState) => state.loading;
export const getUsersLoaded = (state: UserState) => state.loaded;
