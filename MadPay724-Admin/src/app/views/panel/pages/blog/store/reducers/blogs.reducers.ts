
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';

import { Blog } from 'src/app/data/models/blog/blog';
import * as BlogAction from '../actions';

export type Action = BlogAction.All;

export interface BlogState extends EntityState<Blog>{
}

export const blogAdapter: EntityAdapter<Blog> =
    createEntityAdapter<Blog>();

const initBlogsState = blogAdapter.getInitialState();

export function blogReducer(state = initBlogsState, action: Action): BlogState {
    switch (action.type)
    {
        default:
            return state;
    }
}
