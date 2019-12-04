import * as fromRoot from '../../../../../../store';
import { createSelector } from '@ngrx/store';


//route
export const getBlogIdRouterParamas = (state: any) => state.blogId;
 export const getRouterBlogId = createSelector(fromRoot.getRouterParamasState,
     getBlogIdRouterParamas);
