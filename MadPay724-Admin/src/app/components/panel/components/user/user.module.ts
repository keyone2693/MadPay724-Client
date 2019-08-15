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
import { BankCardResolver } from 'src/app/resolvers/bankcard.resolver';
import { NotificationService } from 'src/app/Services/panel/user/notification.service';
import { BankCardsService } from 'src/app/Services/panel/user/bankCards.service';

import { DigitOnlyModule } from '@uiowa/digit-only';
import { RightDocumentComponent } from './components/userinfo/document/components/right-document/right-document.component';
import { LeftDocumentComponent } from './components/userinfo/document/components/left-document/left-document.component';
import { DocumentListComponent } from './components/userinfo/document/components/document-list/document-list.component';
import { DocumentService } from 'src/app/Services/panel/user/document.service';
import { MaterialPersianDateAdapter, PERSIAN_DATE_FORMATS } from 'src/app/Shared/material.persian-date.adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { DocumentResolver } from 'src/app/resolvers/document.resolver';
import { ManageWalletComponent } from './components/manage-wallet/manage-wallet.component';
import { WalletComponent } from './components/manage-wallet/components/wallet/wallet.component';
import { WalletFormComponent } from './components/manage-wallet/components/wallet-form/wallet-form.component';
import { BankCardComponent } from './components/manage-bank-card/components/bank-card/bank-card.component';
import { EditBankCardComponent } from './components/manage-bank-card/components/edit-bank-card/edit-bank-card.component';
import { WalletResolver } from 'src/app/resolvers/wallet.resolver';
import { WalletService } from 'src/app/Services/panel/user/wallet.service';
import { PersianDateModule } from 'src/app/Shared/Pipe/PersianDatePipe/persian-date.module';
import {IRCurrencyPipe, JdatePipe} from 'ngx-persian';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { ManageTicketComponent } from './components/manage-ticket/manage-ticket.component';
import { ListTicketComponent } from './components/manage-ticket/components/list-ticket/list-ticket.component';
import { DetailTicketComponent } from './components/manage-ticket/components/detail-ticket/detail-ticket.component';
import { ChatTicketComponent } from './components/manage-ticket/components/detail-ticket/components/chat-ticket/chat-ticket.component';
import { TicketComponent } from './components/manage-ticket/components/list-ticket/components/ticket/ticket.component';
import { TicketResolver } from 'src/app/resolvers/ticket.resolver';

@NgModule({
  imports: [
    UserRoutingModule,
    FileUploadModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserMaterialModule,
    DigitOnlyModule,
    PersianDateModule,
    // TooltipModule,
    NgScrollbarModule,
    // InfiniteScrollModule,
    // NgxUiLoaderModule
  ],
  declarations: [
    PersianTimeAgoPipe,
    IRCurrencyPipe,
    JdatePipe,
    UserComponent,
    ProfileComponent,
    DocumentComponent,
    RightDocumentComponent,
    LeftDocumentComponent,
    DocumentListComponent,
    UserChangePassComponent,
    UserChangePicComponent,
    UserDashboardComponent,
    NotificationComponent,
    //
    BankCardComponent,
    ManageBankCardComponent,
    EditBankCardComponent,
    //
    ManageWalletComponent,
    WalletComponent,
    WalletFormComponent,
    //
    TicketComponent,
    ManageTicketComponent,
    ListTicketComponent,
    DetailTicketComponent,
    ChatTicketComponent
  ],
  providers: [
    UserService,
    NotificationService,
    BankCardsService,
    DocumentService,
    WalletService,
    UserProfileResolver,
    NotificationResolver,
    BankCardResolver,
    DocumentResolver,
    WalletResolver,
    TicketResolver,
    PreventUnsavedGuard,
    { provide: DateAdapter, useClass: MaterialPersianDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: PERSIAN_DATE_FORMATS }
  ],
   entryComponents:
  [EditBankCardComponent,
  WalletFormComponent]
})
export class UserModule { }
