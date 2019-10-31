import { Routes, RouterModule } from '@angular/router';
import { BlogComponent } from './blog.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { BlogDashboardComponent } from './components/blog-dashboard/blog-dashboard.component';
import { NgModule } from '@angular/core';
import { BlogGroupManageComponent } from './components/blog-group-manage/blog-group-manage.component';
import { BlogGroupAddComponent } from './components/blog-group-manage/components/blog-group-add/blog-group-add.component';
import { BlogGroupEditComponent } from './components/blog-group-manage/components/blog-group-edit/blog-group-edit.component';
import { BlogGroupResolver } from 'src/app/resolvers/user/blogGroup.resolver';

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
                resolve: { gateswallets: BlogGroupResolver }, component: BlogGroupAddComponent,
                data: { roles: ['Admin', 'AdminBlog'], title: ['افزودن دسته بندی بلاگ'] }
            },
            {
                path: 'bloggroup/edit/:easypayId', canActivate: [AuthGuard],
                resolve: { easypayGatesWallets: BlogGroupResolver }, component: BlogGroupEditComponent,
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
