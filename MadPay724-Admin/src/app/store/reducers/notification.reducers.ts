import * as fromAction from '../actions';
import { User } from 'src/app/data/models/user';
import { NotificationStateModel } from '../_model/notificationsStateModel';

export type NotificationActoions = fromAction.AllNotificationActoions;

export const initNotificationState: NotificationStateModel = {
    unVerifiedBlogCount: 0,
    unClosedTicketCount: 0,
    unCheckedEntry: 0,
    unSpecifiedEntry: 0,
    unVerifiedGateInPast7Days: 0,
    unVerifiedBankCardInPast7Days: 0,
    unVerifiedDocuments: 0
    
}
export function NotificationReducer(state = initNotificationState, action: NotificationActoions) {
    switch (action.type) {
        case fromAction.NotificationActionTypes.LOAD_NOTIFICATION:
            return state;
        //***
        case fromAction.NotificationActionTypes.LOAD_NOTIFICATION_SUCCESS:            
            return {
                ...state,
                unVerifiedBlogCount: action.payload.unVerifiedBlogCount,
                unClosedTicketCount: action.payload.unClosedTicketCount,
                unCheckedEntry: action.payload.unCheckedEntry,
                unSpecifiedEntry: action.payload.unSpecifiedEntry,
                unVerifiedGateInPast7Days: action.payload.unVerifiedGateInPast7Days,
                unVerifiedBankCardInPast7Days: action.payload.unVerifiedBankCardInPast7Days,
                unVerifiedDocuments: action.payload.unVerifiedDocuments
            }
        case fromAction.NotificationActionTypes.LOAD_NOTIFICATION_FAIL:
            return { ...state, error: action.payload }      
        //--------------------------------------------
        case fromAction.NotificationActionTypes.INC_BLOGUNVERIFIEDCOUNT:
            return { ...state, unVerifiedBlogCount: state.unVerifiedBlogCount + 1 }
        case fromAction.NotificationActionTypes.DEC_BLOGUNVERIFIEDCOUNT:
            return { ...state, unVerifiedBlogCount: state.unVerifiedBlogCount - 1 }
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