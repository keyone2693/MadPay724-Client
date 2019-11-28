import * as fromRoot from '../../../../../../store';
import { createSelector } from '@ngrx/store';

export const getBlogIdRouterParamas = (state: any) => state.blogId;


export const getRouterBlogId = createSelector(fromRoot.getRouterParamasState,
    getBlogIdRouterParamas);
