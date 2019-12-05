import * as notificationActions from '../actions/notifications.actions'
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { CommonService } from 'src/app/core/_services/common/common.service';
import { BlogService } from 'src/app/core/_services/panel/blog/blog.service';

@Injectable()
export class NotificationEffects {
    constructor(private action$: Actions,private blogService: BlogService
        , private commonService: CommonService) { }

    @Effect()
    LoadNotification$ = this.action$
        .pipe(ofType(notificationActions.NotificationActionTypes.LOAD_NOTIFICATION))
        .pipe(
            switchMap(() => {
                return this.commonService.getNotification().pipe(
                    map(noti => new notificationActions.LoadNotificationSuccess(noti)),
                    catchError(error => of(new notificationActions.LoadNotificationFail(error)))
                );
            })
    );
    
    @Effect()
    LoadUnverifiedBlogCount$ = this.action$
        .pipe(ofType(notificationActions.NotificationActionTypes.LOADBLOGUNVERIFIEDCOUNT))
        .pipe(
            switchMap(() => {
                return this.blogService.getUnverifiedBlogCount().pipe(
                    map(count => new notificationActions.LoadUnverifiedBlogCountSuccess(count)),
                    catchError(error => of(new notificationActions.LoadUnverifiedBlogCountFail(error)))
                );
            })
        );
}