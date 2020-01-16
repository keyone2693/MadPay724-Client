import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { UserComponent } from './user.component';

import { UserRoutingModule } from './user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserMaterialModule } from 'src/app/Shared/Modules/material/user-material.module';

import { DigitOnlyModule } from '@uiowa/digit-only';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ChartistModule } from 'ng-chartist';
import { DocumentComponent } from './pages/userinfo/document/document.component';
import { RightDocumentComponent } from './pages/userinfo/document/pages/right-document/right-document.component';
import { LeftDocumentComponent } from './pages/userinfo/document/pages/left-document/left-document.component';
import { DocumentListComponent } from './pages/userinfo/document/pages/document-list/document-list.component';
import { NotificationComponent } from './pages/notification/notification.component';
import { BankCardComponent } from './pages/manage-bank-card/pages/bank-card/bank-card.component';
import { ManageBankCardComponent } from './pages/manage-bank-card/manage-bank-card.component';
import { EditBankCardComponent } from './pages/manage-bank-card/pages/edit-bank-card/edit-bank-card.component';
import { ManageWalletComponent } from './pages/manage-wallet/manage-wallet.component';
import { WalletComponent } from './pages/manage-wallet/pages/wallet/wallet.component';
import { WalletFormComponent } from './pages/manage-wallet/pages/wallet-form/wallet-form.component';
import { TicketComponent } from './pages/manage-ticket/pages/list-ticket/pages/ticket/ticket.component';
import { ManageTicketComponent } from './pages/manage-ticket/manage-ticket.component';
import { ListTicketComponent } from './pages/manage-ticket/pages/list-ticket/list-ticket.component';
import { DetailTicketComponent } from './pages/manage-ticket/pages/detail-ticket/detail-ticket.component';
import { ChatTicketComponent } from './pages/manage-ticket/pages/detail-ticket/pages/chat-ticket/chat-ticket.component';
import { ChatMessageTicketComponent } from './pages/manage-ticket/pages/detail-ticket/pages/chat-ticket/components/chat-message-ticket/chat-message-ticket.component';
import { CreateFormTicketComponent } from './pages/manage-ticket/pages/list-ticket/pages/create-form-ticket/create-form-ticket.component';
import { GateManageComponent } from './pages/gate-manage/gate-manage.component';
import { GateComponent } from './pages/gate-manage/pages/gate/gate.component';
import { GateFormComponent } from './pages/gate-manage/pages/gate-form/gate-form.component';
import { GateEditComponent } from './pages/gate-manage/pages/gate-edit/gate-edit.component';
import { GateActiveComponent } from './pages/gate-manage/pages/gate-active/gate-active.component';
import { EasypayManageComponent } from './pages/easypay-manage/easypay-manage.component';
import { EasypayListComponent } from './pages/easypay-manage/pages/easypay-list/easypay-list.component';
import { EasypayAddComponent } from './pages/easypay-manage/pages/easypay-add/easypay-add.component';
import { EasypayEditComponent } from './pages/easypay-manage/pages/easypay-edit/easypay-edit.component';
import { NotificationService } from 'src/app/core/_services/panel/user/notification.service';
import { BankCardsService } from 'src/app/core/_services/panel/user/bankCards.service';
import { DocumentService } from 'src/app/core/_services/panel/user/document.service';
import { WalletService } from 'src/app/core/_services/panel/user/wallet.service';
import { GatesService } from 'src/app/core/_services/panel/user/gateService.service';
import { EasyPayService } from 'src/app/core/_services/panel/user/easyPay.service';
import { NotificationResolver } from 'src/app/core/_base/resolvers/user/notification.resolver';
import { BankCardResolver } from 'src/app/core/_base/resolvers/user/bankcard.resolver';
import { DocumentResolver } from 'src/app/core/_base/resolvers/user/document.resolver';
import { WalletResolver } from 'src/app/core/_base/resolvers/user/wallet.resolver';
import { TicketResolver } from 'src/app/core/_base/resolvers/user/ticket.resolver';
import { TicketOverviewResolver } from 'src/app/core/_base/resolvers/user/ticketOverview.resolver';
import { GateResolver } from 'src/app/core/_base/resolvers/user/gate.resolver';
import { GateEditResolver } from 'src/app/core/_base/resolvers/user/gateEdit.resolver';
import { EasyPayEditResolver } from 'src/app/core/_base/resolvers/user/easyPayEdit.resolver';
import { MaterialPersianDateAdapter, PERSIAN_DATE_FORMATS } from 'src/app/core/_config/material.persian-date.adapter';
import { PersianPipeModule } from 'src/app/shared/modules/common/persianPipe.module';
import { UserGateFactorsComponent } from './pages/gate-manage/pages/user-gate-factors/user-gate-factors.component';
import { GenericTableModule } from 'src/app/shared/modules/common/genericTable.module';
import { ButtonMPComponent } from 'src/app/shared/component/button-mp/button-mp.component';
import { CheckboxMPComponent } from 'src/app/shared/component/checkbox-mp/checkbox-mp.component';
import { InputMpComponent } from 'src/app/shared/component/input-mp/input-mp.component';
import { HtmlMpComponent } from 'src/app/shared/component/html-mp/html-mp.component';
import { UserGateFactorDetailComponent } from './pages/gate-manage/pages/user-gate-factors/pages/user-gate-factor-detail/user-gate-factor-detail.component';
import { UserFactorService } from 'src/app/core/_services/panel/user/userFactor.service';
import { UserFactorResolver } from 'src/app/core/_base/resolvers/user/userFactor.resolver';

@NgModule({
  imports: [
    UserRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserMaterialModule,
    DigitOnlyModule,
    // TooltipModule,
    NgScrollbarModule,
    // InfiniteScrollModule,
    // NgxUiLoaderModule,
    SweetAlert2Module.forRoot(),
    ChartistModule,
    PersianPipeModule,
    GenericTableModule,
    PersianPipeModule
  ],
  declarations: [
    UserComponent,
    DocumentComponent,
    RightDocumentComponent,
    LeftDocumentComponent,
    DocumentListComponent,

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
    ChatTicketComponent,
    ChatMessageTicketComponent,
    CreateFormTicketComponent,
    //
    GateManageComponent,
    GateComponent,
    GateFormComponent,
    GateEditComponent,
    GateActiveComponent,
    //
    EasypayManageComponent,
    EasypayListComponent,
    EasypayAddComponent,
    EasypayEditComponent,
    //
    UserGateFactorsComponent,
    UserGateFactorDetailComponent
  ],
  providers: [
    DatePipe,
    NotificationService,
    BankCardsService,
    DocumentService,
    WalletService,
    GatesService,
    EasyPayService,
    UserFactorService,
   
    NotificationResolver,
    BankCardResolver,
    DocumentResolver,
    WalletResolver,
    TicketResolver,
    TicketOverviewResolver,
    GateResolver,
    GateEditResolver,
    EasyPayEditResolver,
    UserFactorResolver,
    { provide: DateAdapter, useClass: MaterialPersianDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: PERSIAN_DATE_FORMATS }
  ],
  entryComponents:
    [
      EditBankCardComponent,
      WalletFormComponent,
      CreateFormTicketComponent,
      GateFormComponent,
      GateActiveComponent
    ]
})
export class UserModule { }
