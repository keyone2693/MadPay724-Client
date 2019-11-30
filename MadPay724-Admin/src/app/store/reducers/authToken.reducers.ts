import * as authTokenAction from '../actions';
import { AuthTokenState } from '../_model/authTokenState';

export type AuthTokenActions = authTokenAction.AllAuthTokenAction;

export const initAuthToken: AuthTokenState = {
    decodedToken:''
}

export function authTokenReducer(state = initAuthToken, action: AuthTokenActions) {
    switch (action.type) {
        case authTokenAction.AuthTokenActionTypes.EDIT_DECODEDTOKEN:
            return { ...state, decodedToken: action.payload };
        case authTokenAction.AuthTokenActionTypes.RESET_DECODEDTOKEN:
            return { ...state, decodedToken:'' };
        default:
            return state;
    }
}
