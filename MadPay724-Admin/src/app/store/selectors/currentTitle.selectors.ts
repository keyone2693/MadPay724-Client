import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CurrentTitleStateModel } from '../_model/currentTitleStateModel';


const selectCurrentTitleId = (state: CurrentTitleStateModel) => state.id;
const selectCurrentTitleTitle = (state: CurrentTitleStateModel) => state.title;


export const getCurrentTitle = createFeatureSelector<CurrentTitleStateModel>('currentTitle');
export const getCurrentTitleId = createSelector(getCurrentTitle, selectCurrentTitleId);;
export const getCurrentTitleTitle = createSelector(getCurrentTitle, selectCurrentTitleTitle);
