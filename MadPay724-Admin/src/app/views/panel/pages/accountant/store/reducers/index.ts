import { AccountantStateModel } from '../_models/accountantStateModel';
import { CurrentTitleReducer } from './currentTitle.reducers';
import { ActionReducerMap } from '@ngrx/store';


export const accountantReducers: ActionReducerMap<AccountantStateModel> = {
    currentTitle: CurrentTitleReducer
}