import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { UserProfileResolver } from 'src/app/resolvers/userprofile.resolver';
import { PreventUnsavedGuard } from 'src/app/guards/prevent-unsaved.guard';
import { ProfileComponent } from './components/userinfo/profile/profile.component';
import { DocumentComponent } from './components/userinfo/document/document.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { NotificationComponent } from './components/notification/notification.component';
import { NotificationResolver } from 'src/app/resolvers/notification.resolver';
import { ManageBankCardComponent } from './components/manage-bank-card/manage-bank-card.component';
import { BankCardResolver } from 'src/app/resolvers/bankcard.resolver';
import { DocumentResolver } from 'src/app/resolvers/document.resolver';
import { ManageWalletComponent } from './components/manage-wallet/manage-wallet.component';
import { WalletResolver } from 'src/app/resolvers/wallet.resolver';
import { ManageTicketComponent } from './components/manage-ticket/manage-ticket.component';
import { TicketResolver } from 'src/app/resolvers/ticket.resolver';
import { DetailTicketComponent } from './components/manage-ticket/components/detail-ticket/detail-ticket.component';
import { TicketOverviewResolver } from 'src/app/resolvers/ticketOverview.resolver';
import { GateManageComponent } from './components/gate-manage/gate-manage.component';
import { GateResolver } from 'src/app/resolvers/user/gate.resolver';
import { GateEditComponent } from './components/gate-manage/components/gate-edit/gate-edit.component';
import { GateEditResolver } from 'src/app/resolvers/user/gateEdit.resolver';
import { EasypayManageComponent } from './components/easypay-manage/easypay-manage.component';
import { EasypayFormComponent } from './components/easypay-manage/components/easypay-form/easypay-form.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: 'dashboard', canActivate: [AuthGuard], component: UserDashboardComponent,
        data: { roles: ['User'], title: ['داشبورد کاربر'] }
      },
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
      // userinfo
      {
        path: 'userinfo/profile', canActivate: [AuthGuard], component: ProfileComponent,
        data: { roles: ['User', 'Admin', 'Blog', 'Accountant'], title: ['پروفایل کاربری'] },
        resolve: { user: UserProfileResolver },
        canDeactivate: [PreventUnsavedGuard]
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
        path: 'easypay/addedit', canActivate: [AuthGuard],
        resolve: { gateswallets: GateResolver }, component: EasypayFormComponent,
        data: { roles: ['User'], title: ['افزودن/ویرایش ایزی پی ها'] }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
