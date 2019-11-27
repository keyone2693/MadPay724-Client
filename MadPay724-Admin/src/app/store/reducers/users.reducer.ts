import { User } from 'src/app/data/models/user';
import * as UserAction from '../actions/users.action';

export type Action = UserAction.All;

export interface UserState{
    data: User[],
    loaded: boolean,
    loading: boolean
}

export const defaultState: UserState ={
    data: [{
        id:"1",
        userName: "popecopeland",
        name: "Stanton Hatfield",
        phoneNumber: "+98 (860) 501-3004",
        address: "733 Lombardy Street, Emison, Federated States Of Micronesia, 6618",
        gender: true,
        age: 15,
        lastActive: new Date(),
        city: "Cowiche",
        photoUrl: "https://randomuser.me/api/portraits/men/40.jpg",
        photo: [
            {
                id: "1",
                url: "https://randomuser.me/api/portraits/men/40.jpg",
                alt: "Fugiat ut incididunt quis exercitation nisi est aute commodo dolore laborum fugiat veniam aliqua.",
                isMain: true,
                description: "Ullamco sunt qui pariatur incididunt."
            }
        ]
    }],
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
        default:
            return state;
    }
}

export const getUsersLoading = (state: UserState) => state.loading;
export const getUsersLoaded = (state: UserState) => state.loaded;
export const getUsers = (state: UserState) => state.data;