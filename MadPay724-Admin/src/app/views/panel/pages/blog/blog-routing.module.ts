import { Routes, RouterModule } from '@angular/router';
import { BlogComponent } from './blog.component';
import { NgModule } from '@angular/core';
import { BlogDashboardComponent } from './pages/blog-dashboard/blog-dashboard.component';
import { AuthGuard } from 'src/app/core/_base/guards/auth.guard';
import { BlogGroupManageComponent } from './pages/blog-group-manage/blog-group-manage.component';
import { BlogGroupResolver } from 'src/app/core/_base/resolvers/blog/blogGroup.resolver';
import { BlogGroupAddComponent } from './pages/blog-group-manage/pages/blog-group-add/blog-group-add.component';
import { BlogGroupEditComponent } from './pages/blog-group-manage/pages/blog-group-edit/blog-group-edit.component';
import { BlogManageComponent } from './pages/blog-manage/blog-manage.component';
import { BlogAddComponent } from './pages/blog-manage/pages/blog-add/blog-add.component';
import { BlogResolver } from 'src/app/core/_base/resolvers/blog/blog.resolver';
import { BlogEditComponent } from './pages/blog-manage/pages/blog-edit/blog-edit.component';

const routes: Routes = [
    {
        path: '',
        component: BlogComponent,
        children: [
            {
                path: 'dashboard', canActivate: [AuthGuard], component: BlogDashboardComponent,
                data: { roles: ['Blog', 'AdminBlog'], title: ['داشبورد بلاگر'] }
            },
            //
            {
                path: 'bloggroup', canActivate: [AuthGuard],
                component: BlogGroupManageComponent,
                data: { roles: ['Admin', 'AdminBlog', 'Blog'], title: ['مدیریت دسته بدنی های بلاگ'] }
            },
            {
                path: 'bloggroup/add', canActivate: [AuthGuard],
                resolve: { bloggroups: BlogGroupResolver }, component: BlogGroupAddComponent,
                data: { roles: ['Admin', 'AdminBlog'], title: ['افزودن دسته بندی بلاگ'] }
            },
            {
                path: 'bloggroup/edit/:bloggroupId', canActivate: [AuthGuard],
                resolve: { bloggroups: BlogGroupResolver }, component: BlogGroupEditComponent,
                data: { roles: ['Admin', 'AdminBlog'], title: ['ویرایش دسته بندی بلاگ '] },
            },
            //
            {
                path: 'blog', canActivate: [AuthGuard],
                resolve: { blogs: BlogResolver },component: BlogManageComponent,
                data: { roles: ['Admin', 'AdminBlog', 'Blog'], title: ['مدیریت بلاگ ها'] }
            },
            {
                path: 'blog/add', canActivate: [AuthGuard],
                resolve: { bloggroups: BlogGroupResolver }, component: BlogAddComponent,
                data: { roles: ['Admin', 'AdminBlog', 'Blog'], title: ['افزودن بلاگ'] }
            },
            {
                path: 'blog/edit/:blogId', canActivate: [AuthGuard],
                resolve: { bloggroups: BlogGroupResolver }, component: BlogEditComponent,
                data: { roles: ['Admin', 'AdminBlog', 'Blog'], title: ['ویرایش بلاگ '] },
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BlogRoutingModule { }
