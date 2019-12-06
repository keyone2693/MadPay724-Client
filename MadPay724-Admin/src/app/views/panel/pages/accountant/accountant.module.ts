import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountantComponent } from './accountant.component';
import { AccountantDashboardComponent } from './pages/accountant-dashboard/accountant-dashboard.component';
import { AccountantRoutingModule } from './accountant-routing.module';
import { AccountantInventoryComponent } from './pages/accountant-inventory/accountant-inventory.component';
import { AccountantManageFactorsComponent } from './pages/accountant-factors/accountant-manage-factors/accountant-manage-factors.component';
import { AccountantFactorsReportComponent } from './pages/accountant-factors/accountant-factorsreport/accountant-factorsreport.component';
import { InventoryListComponent } from './pages/accountant-inventory/pages/inventory-list/inventory-list.component';
import { InventoryService } from 'src/app/core/_services/panel/accountant/Inventory.service';
import { InventoryResolver } from 'src/app/core/_base/resolvers/accountant/inventory.resolver';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { HasRoleModule } from 'src/app/Shared/Modules/hasRole/hasRole.module';
import { PersianDateModule } from 'src/app/core/_base/pipe/PersianDatePipe/persian-date.module';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { IRCurrencyPipe } from 'ngx-persian';
import { AccountantMaterialModule } from 'src/app/shared/modules/material/accountant-material.module';
import { ClipboardModule } from 'ngx-clipboard';
import { InventoryWalletListComponent } from './pages/accountant-inventory/pages/inventory-wallet-list/inventory-wallet-list.component';
import { InventoryBankCardResolver } from 'src/app/core/_base/resolvers/accountant/inventoryBankCard.resolver';
import { InventoryWalletResolver } from 'src/app/core/_base/resolvers/accountant/inventoryWallet.resolver';
import { InventoryBankCardListComponent } from './pages/accountant-inventory/pages/inventory-bankcard-list/inventory-bankcard-list.component';

@NgModule({
  imports: [
    CommonModule,
    AccountantRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AccountantMaterialModule,
    DigitOnlyModule,
    PersianDateModule,
    SweetAlert2Module.forRoot(),
    HasRoleModule,
    ClipboardModule
  ],
  declarations: [
    AccountantComponent,
    AccountantDashboardComponent,
    AccountantFactorsReportComponent,
    AccountantInventoryComponent,
    AccountantManageFactorsComponent,
    InventoryListComponent,
    InventoryWalletListComponent,
    InventoryBankCardListComponent,
    IRCurrencyPipe
  ],
  providers: [
    InventoryService,
    //
    InventoryResolver,
    InventoryWalletResolver,
    InventoryBankCardResolver
  ]
})
export class AccountantModule { }
