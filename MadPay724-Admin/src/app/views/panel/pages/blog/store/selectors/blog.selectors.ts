import * as fromRoot from '../../../../../../store';
import { createSelector } from '@ngrx/store';
import * as fromReducer from '../reducers';

//
export const getBlogIdRouterParamas = (state: any) => state.blogId;

export const { selectAll, selectEntities, selectIds, selectTotal }
    = fromReducer.blogAdapter.getSelectors();


//
export const getRouterBlogId = createSelector(fromRoot.getRouterParamasState,
    getBlogIdRouterParamas);
