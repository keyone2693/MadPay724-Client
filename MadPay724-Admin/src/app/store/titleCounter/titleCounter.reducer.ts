import * as TitleCounterAction from './titleCounter.action';
import { TitleCounter } from './titleCounter';

export type Action = TitleCounterAction.All;

const defaultState: TitleCounter = {
    text: 'سلام من تایتل هستم',
    counter: 0
}

const newState = (state, newData) => {
    return [...state, newState]
    //return Object.assign({}, state, newState);
}

export function titleCounterReducer(state: TitleCounter = defaultState, action: Action) {
    console.log(action.type, state);
    
    switch (action.type) {
        case TitleCounterAction.EDIT_TITLE:
            return newState(state, { text: action.payload });
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