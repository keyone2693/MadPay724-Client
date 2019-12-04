import * as authTokenAction from '../actions';
import { AuthTokenState } from '../_model/authTokenState';

export type AuthTokenActions = authTokenAction.AllAuthTokenAction;

export const initAuthTokenState: AuthTokenState = {
    decodedToken: {
        nameid: '',
        role:[]
    }
}

export function authTokenReducer(state = initAuthTokenState, action: AuthTokenActions) {
    switch (action.type) {
        case authTokenAction.AuthTokenActionTypes.EDIT_DECODEDTOKEN:
            return { ...state, decodedToken: action.payload };
        case authTokenAction.AuthTokenActionTypes.RESET_DECODEDTOKEN:
            return initAuthTokenState;
        default:
            return state;
    }
}
