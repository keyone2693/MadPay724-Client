
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';

import { Blog } from 'src/app/data/models/blog/blog';
import * as BlogAction from '../actions';

export type Action = BlogAction.All;

export interface BlogState extends EntityState<Blog>{
    loading: boolean,
    loaded: boolean
}
export const defaultUsers: BlogState = {
    ids: [],
    entities: {},
    loading: false,
    loaded:false
}

export const blogAdapter: EntityAdapter<Blog> =
    createEntityAdapter<Blog>();

const initBlogsState = blogAdapter.getInitialState(defaultUsers);

export function blogReducer(state = initBlogsState, action: Action): BlogState {
    switch (action.type)
    {
        case BlogAction.BlogActionTypes.LOADBLOGS:
            return {...state, loading: true }
        case BlogAction.BlogActionTypes.LOADBLOGS_SUCCESS:
            return blogAdapter
                .addMany(action.payload, { ...state, loading: false, loaded: true });
        case BlogAction.BlogActionTypes.LOADBLOGS_FAIL:
            return {...state, loaded:false, loading:false}
        default:
            return state;
    }
}
