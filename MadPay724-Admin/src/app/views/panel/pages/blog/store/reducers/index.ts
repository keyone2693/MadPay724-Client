import { ActionReducerMap } from '@ngrx/store';
import * as fromBlogReducer from './blogs.reducers';


export interface BlogSectionState {
    blogs: fromBlogReducer.BlogState;
}
export const reducers: ActionReducerMap<BlogSectionState> = {
    blogs: fromBlogReducer.blogReducer
}

export * from './blogs.reducers';
