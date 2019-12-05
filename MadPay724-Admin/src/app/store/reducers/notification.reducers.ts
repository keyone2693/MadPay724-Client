import * as fromAction from '../actions';
import { User } from 'src/app/data/models/user';
import { NotificationStateModel } from '../_model/notificationsStateModel';

export type NotificationActoions = fromAction.AllNotificationActoions;

export const initNotificationState: NotificationStateModel = {
    blogUnverifiedCount: 0,
    error: ''
}
export function NotificationReducer(state = initNotificationState, action: NotificationActoions) {
    switch (action.type) {
        case fromAction.NotificationActionTypes.LOADBLOGUNVERIFIEDCOUNT:
            return state;
        case fromAction.NotificationActionTypes.LOADBLOGUNVERIFIEDCOUNT_SUCCESS:
            return { ...state, blogUnverifiedCount: action.payload }
        case fromAction.NotificationActionTypes.LOADBLOGUNVERIFIEDCOUNT_FAIL:
            return { ...state, error: action.payload }
        case fromAction.NotificationActionTypes.INC_BLOGUNVERIFIEDCOUNT:
            return { ...state, blogUnverifiedCount: state.blogUnverifiedCount + 1 }
        case fromAction.NotificationActionTypes.DEC_USDBLOGUNVERIFIEDCOUNT:
            return { ...state, blogUnverifiedCount: state.blogUnverifiedCount - 1  }
        default:
            return state;
    }
}