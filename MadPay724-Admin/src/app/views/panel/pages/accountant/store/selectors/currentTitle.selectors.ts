import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AccountantStateModel } from '../_models/accountantStateModel';
import { CurrentTitleStateModel } from '../_models/currentTitleStateModel';


const selectCurrentTitle = (state: AccountantStateModel) => state.currentTitle;
const selectCurrentTitleId = (state: CurrentTitleStateModel) => state.id;
const selectCurrentTitleTitle = (state: CurrentTitleStateModel) => state.title;


export const getAccountantState = createFeatureSelector<AccountantStateModel>('accountantSection');

export const getCurrentTitle = createSelector(getAccountantState, selectCurrentTitle);
export const getCurrentTitleId = createSelector(getCurrentTitle, selectCurrentTitleId);;
export const getCurrentTitleTitle = createSelector(getCurrentTitle, selectCurrentTitleTitle);;