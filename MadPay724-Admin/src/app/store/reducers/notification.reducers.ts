import * as fromAction from '../actions';
import { User } from 'src/app/data/models/user';
import { NotificationStateModel } from '../_model/notificationsStateModel';

export type NotificationActoions = fromAction.AllNotificationActoions;

export const initNotificationState: NotificationStateModel = {
    unverifiedBlogCount: 0
}
export function NotificationReducer(state = initNotificationState, action: NotificationActoions) {
    switch (action.type) {
        case fromAction.NotificationActionTypes.LOAD_NOTIFICATION:
            return state;
        case fromAction.NotificationActionTypes.LOAD_NOTIFICATION_SUCCESS:            
            return {
                ...state,
                unverifiedBlogCount: action.payload.unverifiedBlogCount
            }
        case fromAction.NotificationActionTypes.LOAD_NOTIFICATION_FAIL:
            return { ...state, error: action.payload }      
        //--------------------------------------------
        case fromAction.NotificationActionTypes.INC_BLOGUNVERIFIEDCOUNT:
            return { ...state, unverifiedBlogCount: state.unverifiedBlogCount + 1 }
        case fromAction.NotificationActionTypes.DEC_USDBLOGUNVERIFIEDCOUNT:
            return { ...state, unverifiedBlogCount: state.unverifiedBlogCount - 1 }
        //--------------------------------------------
        default:
            return state;
    }
}