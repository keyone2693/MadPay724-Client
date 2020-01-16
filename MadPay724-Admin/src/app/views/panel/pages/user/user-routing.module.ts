import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';
import { AuthGuard } from 'src/app/core/_base/guards/auth.guard';
import { GateResolver } from 'src/app/core/_base/resolvers/user/gate.resolver';
import { GateManageComponent } from './pages/gate-manage/gate-manage.component';
import { GateEditResolver } from 'src/app/core/_base/resolvers/user/gateEdit.resolver';
import { GateEditComponent } from './pages/gate-manage/pages/gate-edit/gate-edit.component';
import { DocumentComponent } from './pages/userinfo/document/document.component';
import { DocumentResolver } from 'src/app/core/_base/resolvers/user/document.resolver';
import { NotificationResolver } from 'src/app/core/_base/resolvers/user/notification.resolver';
import { NotificationComponent } from './pages/notification/notification.component';
import { ManageBankCardComponent } from './pages/manage-bank-card/manage-bank-card.component';
import { BankCardResolver } from 'src/app/core/_base/resolvers/user/bankcard.resolver';
import { ManageWalletComponent } from './pages/manage-wallet/manage-wallet.component';
import { WalletResolver } from 'src/app/core/_base/resolvers/user/wallet.resolver';
import { ManageTicketComponent } from './pages/manage-ticket/manage-ticket.component';
import { TicketResolver } from 'src/app/core/_base/resolvers/user/ticket.resolver';
import { DetailTicketComponent } from './pages/manage-ticket/pages/detail-ticket/detail-ticket.component';
import { TicketOverviewResolver } from 'src/app/core/_base/resolvers/user/ticketOverview.resolver';
import { EasypayManageComponent } from './pages/easypay-manage/easypay-manage.component';
import { EasyPayEditResolver } from 'src/app/core/_base/resolvers/user/easyPayEdit.resolver';
import { EasypayAddComponent } from './pages/easypay-manage/pages/easypay-add/easypay-add.component';
import { EasypayEditComponent } from './pages/easypay-manage/pages/easypay-edit/easypay-edit.component';
import { UserGateFactorsComponent } from './pages/gate-manage/pages/user-gate-factors/user-gate-factors.component';
import { UserGateFactorDetailComponent } from './pages/gate-manage/pages/user-gate-factors/pages/user-gate-factor-detail/user-gate-factor-detail.component';

import { UserFactorResolver } from 'src/app/core/_base/resolvers/user/userFactor.resolver';


const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [

      //
      {
        path: 'gate', canActivate: [AuthGuard],
        resolve: { gateswallets: GateResolver }, component: GateManageComponent,
        data: { roles: ['User'], title: ['مدیریت درگاه های پرداخت'] }
      },
      {
        path: 'gate/edit/:gateId', canActivate: [AuthGuard],
        resolve: { gatewallets: GateEditResolver },
        component: GateEditComponent,
        data: { roles: ['User'], title: ['ویرایش در گاه پرداخت'] },
      },
      {
        path: 'gate/:gateId/factors', canActivate: [AuthGuard],
        component: UserGateFactorsComponent,
        data: { roles: ['User'], title: ['فاکتور های درگاه پرداخت'] },
      },
      {
        path: 'gate/factors/:factorId/detail', canActivate: [AuthGuard],
        resolve: { factorDetail: UserFactorResolver },
        component: UserGateFactorDetailComponent,
        data: { roles: ['User'], title: ['جزییات  فاکتور'] },
      },
      //
      {
        path: 'userinfo/documents', canActivate: [AuthGuard],
        resolve: { documents: DocumentResolver }, component: DocumentComponent,
        data: { roles: ['User'], title: ['ارسال مدارک شناسایی'] }
      },
      //
      {
        path: 'notification', canActivate: [AuthGuard],
        resolve: { notify: NotificationResolver }, component: NotificationComponent,
        data: { roles: ['User'], title: [' تنظیمات اطلاع رسانی'] }
      },
      //
      {
        path: 'bankcard', canActivate: [AuthGuard],
        resolve: { bankcards: BankCardResolver }, component: ManageBankCardComponent,
        data: { roles: ['User'], title: ['مدیریت کارت های بانکی'] }
      },
      //
      {
        path: 'wallet', canActivate: [AuthGuard],
        resolve: { wallets: WalletResolver }, component: ManageWalletComponent,
        data: { roles: ['User'], title: ['مدیریت کیف پول'] }
      },
      //
      {
        path: 'tickets', canActivate: [AuthGuard],
        resolve: { tickets: TicketResolver }, component: ManageTicketComponent,
        data: { roles: ['User'], title: ['پشتیبانی'] },
        children: [
          {
            path: 'overview/:ticketId',
            component: DetailTicketComponent,
            resolve: { ticket: TicketOverviewResolver },
            data: { roles: ['User'], title: ['مشاهده ی تیکت'] }
          }
        ]
      },
      //
      {
        path: 'easypay', canActivate: [AuthGuard],
        component: EasypayManageComponent,
        data: { roles: ['User'], title: ['مدیریت ایزی پی ها'] }
      },
      {
        path: 'easypay/add', canActivate: [AuthGuard],
        resolve: { gateswallets: GateResolver }, component: EasypayAddComponent,
        data: { roles: ['User'], title: ['افزودن ایزی پی ها'] }
      },
      {
        path: 'easypay/edit/:easypayId', canActivate: [AuthGuard],
        resolve: { easypayGatesWallets: EasyPayEditResolver }, component: EasypayEditComponent ,
        data: { roles: ['User'], title: ['ویرایش ایزی پی'] },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
