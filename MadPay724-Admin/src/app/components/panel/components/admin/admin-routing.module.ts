import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersManagementComponent } from './components/users-management/users-management.component';
import { AdminComponent } from './admin.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
          {path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent,
          data: {roles: ['Admin']}},
          {path: 'users/usersmanagement', canActivate: [AuthGuard], component: UsersManagementComponent,
            data: {roles: ['Admin']}}
        ]
       }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
