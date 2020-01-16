import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'src/app/core/_base/guards/auth.guard';
import { PreventUnsavedGuard } from 'src/app/core/_base/guards/prevent-unsaved.guard';
import { UserProfileResolver } from 'src/app/core/_base/resolvers/user/userprofile.resolver';
import { CommonpComponent } from './commonp.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AccountantDashboardComponent } from './pages/accountant-dashboard/accountant-dashboard.component';
import { BlogDashboardComponent } from './pages/blog-dashboard/blog-dashboard.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { UserDashboardResolver } from 'src/app/core/_base/resolvers/common/userDashboard.resolver';

const routes: Routes = [
  {
    path: '',
    component: CommonpComponent,
    children: [
      {
        path: 'admin/dashboard', canActivate: [AuthGuard], component: AdminDashboardComponent,
        data: { roles: ['Admin'], title: ['داشبورد مدیریت'] }
      },
      {
        path: 'accountant/dashboard', canActivate: [AuthGuard], component: AccountantDashboardComponent,
        data: { roles: ['Accountant', 'Admin'], title: ['داشبورد حسابدار'] }
      },
      {
        path: 'blog/dashboard', canActivate: [AuthGuard], component: BlogDashboardComponent,
        data: { roles: ['Blog', 'AdminBlog'], title: ['داشبورد بلاگر'] }
      },
      {
        path: 'user/dashboard', canActivate: [AuthGuard],
        resolve: { userDashboard :UserDashboardResolver },
        component: UserDashboardComponent,
        data: { roles: ['User'], title: ['داشبورد کاربر'] }
      },
      
     
      
      // userinfo
      {
        path: 'userprofile', canActivate: [AuthGuard],
        component: ProfileComponent,
        data: {
          roles: ['User', 'Admin', 'AdminBlog', 'Blog', 'Accountant'],
          title: ['پروفایل کاربری']
        },
        resolve: { user: UserProfileResolver },
        canDeactivate: [PreventUnsavedGuard]
      }
      //
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommonpRoutingModule { }
