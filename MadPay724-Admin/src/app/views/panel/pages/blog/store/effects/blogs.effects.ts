import { Injectable } from '@angular/core';
import { BlogService } from 'src/app/core/_services/panel/blog/blog.service';
import { AuthService } from 'src/app/core/_services/auth/auth.service';
import { Effect, ofType, Actions } from '@ngrx/effects';
import * as blogsActions from '../actions'
import { switchMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class BlogsEffects {
    constructor(private blogService: BlogService,
        private authService: AuthService, private action$: Actions) { }
    
    @Effect()
    loadBlogs$ = this.action$.pipe(ofType(blogsActions.BlogActionTypes.LOADBLOGS))
        .pipe(
            switchMap(() => {
                return this.blogService
                    .testgetBlogs(this.authService.decodedToken.nameid).pipe(
                    map(blogs => new blogsActions.LoadBlogsSuccess(blogs)),
                    catchError(err => of(new blogsActions.LoadBlogsFail()))
                    );
            })
        );
}