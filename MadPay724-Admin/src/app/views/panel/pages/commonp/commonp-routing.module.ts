import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'src/app/core/_base/guards/auth.guard';
import { PreventUnsavedGuard } from 'src/app/core/_base/guards/prevent-unsaved.guard';
import { UserProfileResolver } from 'src/app/core/_base/resolvers/user/userprofile.resolver';
import { CommonpComponent } from './commonp.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: CommonpComponent,
    children: [
      // userinfo
      {
        path: 'userprofile', canActivate: [AuthGuard], component: ProfileComponent,
        data: { roles: ['User', 'Admin', 'AdminBlog', 'Blog', 'Accountant'], title: ['پروفایل کاربری'] },
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
