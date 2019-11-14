import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AuthGuard } from 'src/app/core/_base/guards/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersManagementComponent } from './pages/users-management/users-management.component';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
          {path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent,
          data: {roles: ['Admin'], title: ['داشبورد مدیریت']}},
          {path: 'users/usersmanagement', canActivate: [AuthGuard], component: UsersManagementComponent,
            data: {roles: ['Admin'], title: ['مدیریت کاربران']}}
        ]
       }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
