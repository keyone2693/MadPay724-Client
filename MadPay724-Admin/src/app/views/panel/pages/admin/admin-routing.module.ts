import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AuthGuard } from 'src/app/core/_base/guards/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersManagementComponent } from './pages/users-management/users-management.component';
import { InventoryResolver } from 'src/app/core/_base/resolvers/accountant/inventory.resolver';
import { UserResolver } from 'src/app/core/_base/resolvers/admin/user.resolver';
import { UserRolesResolver } from 'src/app/core/_base/resolvers/admin/userRoles.resolver';
import { UsersRolesComponent } from './pages/users-management/pages/users-roles/users-roles.component';
import { UsersGatesComponent } from './pages/users-management/pages/users-gates/users-gates.component';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
          {path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent,
            data: { roles: ['Admin'], title: ['داشبورد مدیریت'] }
          },
          {
            path: 'users/management', canActivate: [AuthGuard],
            resolve: { users: UserResolver },
            component: UsersManagementComponent,
            data: { roles: ['Admin'], title: ['مدیریت کاربران'] }
          },
          {
            path: 'users/:userId/roles', canActivate: [AuthGuard],
            resolve: { roles: UserRolesResolver },
            component: UsersRolesComponent,
            data: { roles: ['Admin'], title: ['مدیریت نقش های کاربران'] }
          },
          //
          {
            path: 'users/:userId/gates', canActivate: [AuthGuard],
            component: UsersGatesComponent,
            data: { roles: ['Admin'], title: ['مدیریت درگاه های کاربران'] }
          }
        ]
       }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
