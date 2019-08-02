import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserService } from 'src/app/Services/panel/user.service';
import { UserProfileResolver } from 'src/app/resolvers/userprofile.resolver';
import { PreventUnsavedGuard } from 'src/app/guards/prevent-unsaved.guard';
import { FileUploadModule } from 'ng2-file-upload';

import {MatCheckboxModule} from '@angular/material/checkbox';
import { UserRoutingModule } from './user-routing.module';
import { UserChangePicComponent } from './components/userinfo/profile/components/user-change-pic/user-change-pic.component';
import { UserChangePassComponent } from './components/userinfo/profile/components/user-change-pass/user-change-pass.component';
import { DocumentComponent } from './components/userinfo/document/document.component';
import { ProfileComponent } from './components/userinfo/profile/profile.component';
import { PersianTimeAgoPipe } from 'persian-time-ago-pipe';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    UserRoutingModule,
    FileUploadModule,
    MatCheckboxModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    PersianTimeAgoPipe,
    UserComponent,
    ProfileComponent,
    DocumentComponent,
    UserChangePassComponent,
    UserChangePicComponent,
    UserDashboardComponent
  ],
  providers: [
    UserService,
    UserProfileResolver,
    PreventUnsavedGuard
  ]
})
export class UserModule { }
