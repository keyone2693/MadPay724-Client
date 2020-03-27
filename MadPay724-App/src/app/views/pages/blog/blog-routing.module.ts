import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BlogDirectoryComponent } from './pages/blog-directory/blog-directory.component';
import { BlogPostComponent } from './pages/blog-post/blog-post.component';
import { BlogResolver } from 'src/app/core/_base/resolvers/blog/BlogResolver.resolver';
import { BlogPostResolver } from 'src/app/core/_base/resolvers/blog/BlogPostResolver.resolver';

const routes: Routes = [
    {
        path: 'page/:pageNumber',
        component: BlogDirectoryComponent,
        resolve: { blogDirData: BlogResolver },
        data: { title: ['وبلاگ مادپی 724'] }
    },
    {
        path: 'search/:filter/page/:pageNumber',
        component: BlogDirectoryComponent,
        resolve: { blogDirData: BlogResolver },
        data: { title: ['وبلاگ مادپی 724'] }
    },
    {
        path: 'group/:name/page/:pageNumber',
        component: BlogDirectoryComponent,
        resolve: { blogDirData: BlogResolver },
        data: { title: ['وبلاگ مادپی 724'] }
    },
    {
        path: 'date/year/:year/month/:month/page/:pageNumber',
        component: BlogDirectoryComponent,
        resolve: { blogDirData: BlogResolver },
        data: { title: ['وبلاگ مادپی 724'] }
    },
    {
        path: 'post/:blogId/:blogTitle',
        component: BlogPostComponent,
        resolve: { blogPostData: BlogPostResolver },
        data: { title: ['وبلاگ مادپی 724'] }
    }
]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BlogRoutingModule { }