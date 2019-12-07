import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountantComponent } from './accountant.component';
import { AccountantDashboardComponent } from './pages/accountant-dashboard/accountant-dashboard.component';
import { AccountantRoutingModule } from './accountant-routing.module';
import { AccountantManageFactorsComponent } from './pages/accountant-factors/accountant-manage-factors/accountant-manage-factors.component';
import { AccountantFactorsReportComponent } from './pages/accountant-factors/accountant-factorsreport/accountant-factorsreport.component';
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
import { InventoryBankCardResolver } from 'src/app/core/_base/resolvers/accountant/inventoryBankCard.resolver';
import { InventoryWalletResolver } from 'src/app/core/_base/resolvers/accountant/inventoryWallet.resolver';
import { StoreModule } from '@ngrx/store';
import { accountantReducers } from './store/reducers';
import { AccWalletResolver } from 'src/app/core/_base/resolvers/accountant/accWallet.resolver';
import { AccBankCardResolver } from 'src/app/core/_base/resolvers/accountant/accBankcard.resolver';
import { AccountantInventoryComponent } from './pages/accountant-financial/accountant-inventory/accountant-inventory.component';
import { InventoryWalletListComponent } from './pages/accountant-financial/accountant-inventory/pages/inventory-wallet-list/inventory-wallet-list.component';
import { InventoryListComponent } from './pages/accountant-financial/accountant-inventory/pages/inventory-list/inventory-list.component';
import { InventoryBankCardListComponent } from './pages/accountant-financial/accountant-inventory/pages/inventory-bankCard-list/inventory-bankCard-list.component';
import { AccountantBankCardsComponent } from './pages/accountant-financial/accountant-bankCards/accountant-bankCards.component';
import { AccountantWalletsComponent } from './pages/accountant-financial/accountant-wallets/accountant-wallets.component';
import { AccountantBankCardsListComponent } from './pages/accountant-financial/accountant-bankCards/pages/accountant-bankCards-list/accountant-bankCards-list.component';

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
    ClipboardModule,
    StoreModule.forFeature('accountantSection',accountantReducers),
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
    AccountantWalletsComponent,
    AccountantBankCardsComponent,
    AccountantBankCardsListComponent,
    IRCurrencyPipe
  ],
  providers: [
    InventoryService,
    //
    InventoryResolver,
    InventoryWalletResolver,
    InventoryBankCardResolver,
    AccWalletResolver,
    AccBankCardResolver
  ]
})
export class AccountantModule { }
