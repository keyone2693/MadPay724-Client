import * as notificationActions from '../actions/notifications.actions'
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { BlogService } from 'src/app/core/_services/panel/blog/blog.service';

@Injectable()
export class NotificationEffects {
    constructor(private action$: Actions, private blogService: BlogService) { }

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