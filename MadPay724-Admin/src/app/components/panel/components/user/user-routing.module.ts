import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { UserComponent } from './user.component';
import { UserProfileResolver } from 'src/app/resolvers/userprofile.resolver';
import { PreventUnsavedGuard } from 'src/app/guards/prevent-unsaved.guard';
import { DashboardComponent } from '../admin/components/dashboard/dashboard.component';
import { ProfileComponent } from './components/userinfo/profile/profile.component';
import { DocumentComponent } from './components/userinfo/document/document.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';

const routes: Routes = [
   {
    path: '',
    component: UserComponent,
    children: [
      {path: 'dashboard', canActivate: [AuthGuard], component: UserDashboardComponent,
      data: {roles: ['User']}},
      // userinfo
      {path: 'userinfo/profile', canActivate: [AuthGuard], component: ProfileComponent,
       data: {roles: ['User', 'Admin', 'Blog', 'Accountant']},
       resolve: {user: UserProfileResolver},
       canDeactivate: [PreventUnsavedGuard]},
      {path: 'userinfo/documents', canActivate: [AuthGuard], component: DocumentComponent,
       data: {roles: ['User']}},
      // users

    ]
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
