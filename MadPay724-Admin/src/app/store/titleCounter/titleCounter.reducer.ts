import * as TitleCounterAction from './titleCounter.action';
import { TitleCounter } from './titleCounter';

export type Action = TitleCounterAction.All;

const defaultState: TitleCounter = {
    title: 'سلام من تایتل هستم',
    counter: 0
}

const newState = (state, newData) => {
    //return [...state, newData];
    return Object.assign({}, state, newData);
}

export function titleCounterReducer(state: TitleCounter = defaultState, action: Action) {
    switch (action.type) {
        case TitleCounterAction.EDIT_TITLE:
            return newState(state, { title: action.payload });
        case TitleCounterAction.INCREASECOUNTER:
            return newState(state, { counter: state.counter + 1 });
        case TitleCounterAction.DECREASECOUNTER:
            return newState(state, { counter: state.counter - 1 });
        case TitleCounterAction.RESETCOUNTER:
            return defaultState;
        default:
            return state
    }

}