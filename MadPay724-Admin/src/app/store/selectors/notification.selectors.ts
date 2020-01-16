import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NotificationStateModel } from '../_model/notificationsStateModel';

export const selectNotificationBlogUnverifiedCount = (state: NotificationStateModel) => state.unVerifiedBlogCount;

export const getNotificationState = createFeatureSelector<NotificationStateModel>('notification');
export const getNotificationBlogUnverifiedCount = createSelector(getNotificationState, selectNotificationBlogUnverifiedCount);
