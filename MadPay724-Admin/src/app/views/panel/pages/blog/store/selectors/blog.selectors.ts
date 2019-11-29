import * as fromRoot from '../../../../../../store';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromReducer from '../reducers';
import { PageQuery } from '../_models';

//
export const  getBlogState = createFeatureSelector<fromReducer.BlogSectionState>("blogSection");

//route
export const getBlogIdRouterParamas = (state: any) => state.blogId;
export const getRouterBlogId = createSelector(fromRoot.getRouterParamasState,
    getBlogIdRouterParamas);
//blog
export const slecetBlogsLoading = (state: fromReducer.BlogState) => state.loading;
export const slecetBlogsLoaded = (state: fromReducer.BlogState) => state.loaded;
export const { selectAll, selectEntities, selectIds, selectTotal }
    = fromReducer.blogAdapter.getSelectors();

export const getBlogs = createSelector(getBlogState,
    (state: fromReducer.BlogSectionState) => state.blogs);

export const getBlogsLoading = createSelector(getBlogs, slecetBlogsLoading);
export const getBlogsLoaded = createSelector(getBlogs, slecetBlogsLoaded);


export const getAllBlogs = createSelector(getBlogs,
    selectAll);
export const getBlogsPage = (page: PageQuery) => createSelector(getAllBlogs,
    allBlogs => {
        const start = page.pageIbdex * page.pageSize;
        const end = start + page.pageSize;

        return allBlogs.slice(start, end);
});
