import * as fromRoot from '../../../../../../store';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromReducer from '../reducers';
import { PageQuery } from '../_models';
import { Blog } from 'src/app/data/models/blog/blog';

//
export const  getBlogState = createFeatureSelector<fromReducer.BlogState>("blogSection");

//route
export const getBlogIdRouterParamas = (state: any) => state.blogId;
export const getRouterBlogId = createSelector(fromRoot.getRouterParamasState,
    getBlogIdRouterParamas);
//blog
export const { selectAll, selectEntities, selectIds, selectTotal }
    = fromReducer.blogAdapter.getSelectors();

export const selectBlogsPage = (page: PageQuery) => page;

export const getAllBlogs = createSelector(getBlogState,
    selectAll);

export const getBlogsPage = selectBlogsPage => createSelector(getAllBlogs,
    allBlogs => {
        const start = selectBlogsPage.page.pageIbdex * selectBlogsPage.page.pageSize;
        const end = start + selectBlogsPage.page.pageSize;

        return allBlogs.slice(start, end);
    });
