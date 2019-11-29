import { Action } from '@ngrx/store';
import { PageQuery } from '../_models/PageQuery';
import { Blog } from 'src/app/data/models/blog/blog';

export enum BlogActionTypes {
    LOADBLOGS = '[Blogs] Load Blogs',
    LOADBLOGS_SUCCESS = '[Blogs] Load Blogs Success',
    LOADBLOGS_FAIL ='[Blogs] Load Blogs Fail'
}

export class LoadBlogs implements Action {
    readonly type = BlogActionTypes.LOADBLOGS;
    constructor(public payload: { page: PageQuery }) {}
}

export class LoadBlogsSuccess implements Action {
    readonly type = BlogActionTypes.LOADBLOGS_SUCCESS;
    constructor(public payload: { blogs: Blog[] }) { }
}

export class LoadBlogsFail implements Action {
    readonly type = BlogActionTypes.LOADBLOGS_FAIL;
}

export type All = LoadBlogs | LoadBlogsSuccess | LoadBlogsFail;