import { Action } from '@ngrx/store';
import { PageQuery } from '../_models/PageQuery';
import { Blog } from 'src/app/data/models/blog/blog';

export enum BlogActionTypes {
    LOADBLOG = '[Blog] Load Blogs',
    LOADBLOG_SUCCESS = '[Blog] Load Blogs Success',
    LOADBLOG_FAIL ='[Blog] Load Blogs Fail'
}

export class LoadUsers implements Action {
    readonly type = BlogActionTypes.LOADBLOG;
    constructor(public payload: { blogId: string, page: PageQuery }) {}
}

export class LoadUsersSuccess implements Action {
    readonly type = BlogActionTypes.LOADBLOG_SUCCESS;
    constructor(public payload: { blogs: Blog[] }) { }
}

export class LoadUsersFail implements Action {
    readonly type = BlogActionTypes.LOADBLOG_FAIL;
}

export type All = LoadUsers | LoadUsersSuccess | LoadUsersFail;