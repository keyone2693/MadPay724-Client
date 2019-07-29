import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PanelComponent } from './panel.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { UserProfileResolver } from 'src/app/resolvers/userprofile.resolver';
import { PreventUnsavedGuard } from 'src/app/guards/prevent-unsaved.guard';
import { UsersManagementComponent } from './components/admin/users-management/users-management.component';
import { ProfileComponent } from './components/user/userinfo/profile/profile.component';
import { DocumentComponent } from './components/user/userinfo/document/document.component';

const routes: Routes = [
  {
    path: '',
    component: PanelComponent,
    children: [
      {path: 'user/dashboard', component: DashboardComponent},
      // userinfo
      {path: 'user/userinfo/profile', component: ProfileComponent,
       resolve: {user: UserProfileResolver},
       canDeactivate: [PreventUnsavedGuard]},
      {path: 'user/userinfo/documents', component: DocumentComponent},
      // users
      {path: 'admin/users/usersmanagement', component: UsersManagementComponent}
    ]
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }
