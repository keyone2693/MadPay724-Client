import * as currentTitleAction from '../actions';
import { CurrentTitleStateModel } from '../_model/currentTitleStateModel';


export const initCurrentTitle: CurrentTitleStateModel = {
    id: '...',
    title: '...'
}

export function CurrentTitleReducer(state = initCurrentTitle,
    action: currentTitleAction.AllCurrentTitleActios) {
    switch (action.type) {
        case currentTitleAction.CurrentTitleActionTypes.EDIT_CURRENTTTITLE:
            return { ...state, id: action.payload.id, title: action.payload.title };
        case currentTitleAction.CurrentTitleActionTypes.RESET_CURRENTTITLE:
            return initCurrentTitle;
        default:
            return state;
    }
}
