import { Routes, RouterModule } from '@angular/router';
import { BlogComponent } from './blog.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { BlogDashboardComponent } from './components/blog-dashboard/blog-dashboard.component';
import { NgModule } from '@angular/core';
import { BlogGroupManageComponent } from './components/blog-group-manage/blog-group-manage.component';
import { BlogGroupAddComponent } from './components/blog-group-manage/components/blog-group-add/blog-group-add.component';
import { BlogGroupEditComponent } from './components/blog-group-manage/components/blog-group-edit/blog-group-edit.component';
import { BlogGroupResolver } from 'src/app/resolvers/blog/blogGroup.resolver';
import { BlogGroupEditResolver } from 'src/app/resolvers/blog/blogGroupEdit.resolver';
import { BlogAddComponent } from './components/blog-manage/components/blog-add/blog-add.component';
import { BlogEditComponent } from './components/blog-manage/components/blog-edit/blog-edit.component';
import { BlogManageComponent } from './components/blog-manage/blog-manage.component';

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
                component: BlogManageComponent,
                data: { roles: ['Admin', 'AdminBlog', 'Blog'], title: ['مدیریت دسته بدنی های بلاگ'] }
            },
            {
                path: 'blog/add', canActivate: [AuthGuard],
                resolve: { blogs: BlogResolver }, component: BlogAddComponent,
                data: { roles: ['Admin', 'AdminBlog'], title: ['افزودن دسته بندی بلاگ'] }
            },
            {
                path: 'blog/edit/:blogId', canActivate: [AuthGuard],
                resolve: { blogs: BlogResolver }, component: BlogEditComponent,
                data: { roles: ['Admin', 'AdminBlog'], title: ['ویرایش دسته بندی بلاگ '] },
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BlogRoutingModule { }
