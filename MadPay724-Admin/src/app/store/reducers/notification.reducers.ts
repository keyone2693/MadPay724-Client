import * as fromAction from '../actions';
import { User } from 'src/app/data/models/user';
import { NotificationStateModel } from '../_model/notificationsStateModel';

export type NotificationActoions = fromAction.AllNotificationActoions;

export const initNotificationState: NotificationStateModel = {
    unverifiedBlogCount: 0,
    unClosedTicketCount:0
}
export function NotificationReducer(state = initNotificationState, action: NotificationActoions) {
    switch (action.type) {
        case fromAction.NotificationActionTypes.LOAD_NOTIFICATION:
            return state;
        //***
        case fromAction.NotificationActionTypes.LOAD_NOTIFICATION_SUCCESS:            
            return {
                ...state,
                unverifiedBlogCount: action.payload.unverifiedBlogCount,
                unClosedTicketCount: action.payload.unClosedTicketCount
            }
        case fromAction.NotificationActionTypes.LOAD_NOTIFICATION_FAIL:
            return { ...state, error: action.payload }      
        //--------------------------------------------
        case fromAction.NotificationActionTypes.INC_BLOGUNVERIFIEDCOUNT:
            return { ...state, unverifiedBlogCount: state.unverifiedBlogCount + 1 }
        case fromAction.NotificationActionTypes.DEC_BLOGUNVERIFIEDCOUNT:
            return { ...state, unverifiedBlogCount: state.unverifiedBlogCount - 1 }
        //--------------------------------------------
        case fromAction.NotificationActionTypes.INC_UNCLOSEDTICKETCOUNT:
            return { ...state, unClosedTicketCount: state.unClosedTicketCount + 1 }
        case fromAction.NotificationActionTypes.DEC_UNCLOSEDTICKETCOUNT:
            return { ...state, unClosedTicketCount: state.unClosedTicketCount - 1 }
        //--------------------------------------------
        default:
            return state;
    }
}