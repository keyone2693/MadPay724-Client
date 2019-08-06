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
import { UserMaterialModule } from 'src/app/Shared/Modules/material/user-material.module';
import { NotificationComponent } from './components/notification/notification.component';
import { NotificationResolver } from 'src/app/resolvers/notification.resolver';
import { ManageBankCardComponent } from './components/manage-bank-card/manage-bank-card.component';
import { BankCardComponent } from './components/manage-bank-card/bank-card/bank-card.component';
import { BankCardResolver } from 'src/app/resolvers/bankcard.resolver';
import { NotificationService } from 'src/app/Services/panel/user/notification.service';
import { EditBankCardComponent } from './components/manage-bank-card/edit-bank-card/edit-bank-card.component';
import { BankCardsService } from 'src/app/Services/panel/user/bankCards.service';

import { DigitOnlyModule } from '@uiowa/digit-only';

@NgModule({
  imports: [
    UserRoutingModule,
    FileUploadModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserMaterialModule,
    DigitOnlyModule
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
    ManageBankCardComponent,
    EditBankCardComponent
  ],
  providers: [
    UserService,
    NotificationService,
    BankCardsService,
    UserProfileResolver,
    NotificationResolver,
    BankCardResolver,
    PreventUnsavedGuard
  ],
   entryComponents:
  [EditBankCardComponent]
})
export class UserModule { }
