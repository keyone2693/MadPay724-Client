import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserService } from 'src/app/Services/panel/user.service';
import { UserProfileResolver } from 'src/app/resolvers/userprofile.resolver';
import { PreventUnsavedGuard } from 'src/app/guards/prevent-unsaved.guard';
import { FileUploadModule } from 'ng2-file-upload';

import { UserRoutingModule } from './user-routing.module';
import { UserChangePicComponent } from './components/userinfo/profile/components/user-change-pic/user-change-pic.component';
import { UserChangePassComponent } from './components/userinfo/profile/components/user-change-pass/user-change-pass.component';
import { DocumentComponent } from './components/userinfo/document/document.component';
import { ProfileComponent } from './components/userinfo/profile/profile.component';
import { PersianTimeAgoPipe } from 'persian-time-ago-pipe';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/SharedModule/material/material.module';
import { NotificationComponent } from './components/notification/notification.component';
import { NotificationResolver } from 'src/app/resolvers/notification.resolver';
import { ManageBankCardComponent } from './components/manage-bank-card/manage-bank-card.component';
import { BankCardComponent } from './components/manage-bank-card/bank-card/bank-card.component';

@NgModule({
  imports: [
    UserRoutingModule,
    FileUploadModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    PersianTimeAgoPipe,
    UserComponent,
    ProfileComponent,
    DocumentComponent,
    UserChangePassComponent,
    UserChangePicComponent,
    UserDashboardComponent,
    NotificationComponent,
    BankCardComponent,
    ManageBankCardComponent
  ],
  providers: [
    UserService,
    UserProfileResolver,
    NotificationResolver,
    PreventUnsavedGuard
  ], entryComponents:
  [BankCardComponent]
})
export class UserModule { }
