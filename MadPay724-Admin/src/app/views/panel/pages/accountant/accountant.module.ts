import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountantComponent } from './accountant.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AccountantRoutingModule } from './accountant-routing.module';
import { ManageFactorsComponent } from './pages/factors/manage-factors/manage-factors.component';
import { FactorsReportComponent } from './pages/factors/factorsreport/factorsreport.component';
import { InventoryService } from 'src/app/core/_services/panel/accountant/Inventory.service';
import { InventoryResolver } from 'src/app/core/_base/resolvers/accountant/inventory.resolver';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { HasRoleModule } from 'src/app/Shared/Modules/hasRole/hasRole.module';
import { PersianDateModule } from 'src/app/core/_base/pipe/PersianDatePipe/persian-date.module';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { AccountantMaterialModule } from 'src/app/shared/modules/material/accountant-material.module';
import { ClipboardModule } from 'ngx-clipboard';
import { InventoryBankCardResolver } from 'src/app/core/_base/resolvers/accountant/inventoryBankCard.resolver';
import { InventoryWalletResolver } from 'src/app/core/_base/resolvers/accountant/inventoryWallet.resolver';
import { StoreModule } from '@ngrx/store';
import { accountantReducers } from './store/reducers';
import { AccWalletResolver } from 'src/app/core/_base/resolvers/accountant/accWallet.resolver';
import { AccBankCardResolver } from 'src/app/core/_base/resolvers/accountant/accBankcard.resolver';
import { InventoryComponent } from './pages/financial/inventory/inventory.component';
import { InventoryWalletListComponent } from './pages/financial/inventory/pages/inventory-wallet-list/inventory-wallet-list.component';
import { InventoryListComponent } from './pages/financial/inventory/pages/inventory-list/inventory-list.component';
import { InventoryBankCardListComponent } from './pages/financial/inventory/pages/inventory-bankCard-list/inventory-bankCard-list.component';
import { BankCardsComponent } from './pages/financial/bankCards/bankCards.component';
import { WalletsComponent } from './pages/financial/wallets/wallets.component';
import { BankCardsListComponent } from './pages/financial/bankCards/pages/bankCards-list/bankCards-list.component';
import { WalletsListComponent } from './pages/financial/wallets/pages/wallets-list/wallets-list.component';
import { EntryPardakhtComponent } from './pages/entry/entry-pardakht/entry-pardakht.component';
import { EntryArchiveComponent } from './pages/entry/entry-archive/entry-archive.component';
import { EntryApproveComponent } from './pages/entry/entry-approve/entry-approve.component';
import { EntryService } from 'src/app/core/_services/panel/accountant/entry.service';
import { FactorService } from 'src/app/core/_services/panel/accountant/factor.service';
import { EntryApproveResolver } from 'src/app/core/_base/resolvers/accountant/entryApprove.resolver';
import { EntryArchiveResolver } from 'src/app/core/_base/resolvers/accountant/entryArchive.resolver';
import { EntryPardakhtResolver } from 'src/app/core/_base/resolvers/accountant/entryPardakht.resolver';
import { FactorResolver } from 'src/app/core/_base/resolvers/accountant/factor.resolver';
import { PersianPipeModule } from 'src/app/shared/modules/common/persianPipe.module';
import { EntryResolver } from 'src/app/core/_base/resolvers/accountant/entry.resolver';
import { EntryEditComponent } from './pages/entry/entry-edit/entry-edit.component';
import { BankCardEntryResolver } from 'src/app/core/_base/resolvers/accountant/bankCardEntry.resolver';
import { BankCardsEntryComponent } from './pages/financial/bankCards/pages/bankCards-entry/bankCards-entry.component';
import { SimplemattableModule } from 'simplemattable';

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
    StoreModule.forFeature('accountantSection', accountantReducers),
    PersianPipeModule,
    SimplemattableModule
  ],
  declarations: [
    AccountantComponent,
    DashboardComponent,
    FactorsReportComponent,
    InventoryComponent,
    ManageFactorsComponent,
    InventoryListComponent,
    InventoryWalletListComponent,
    InventoryBankCardListComponent,
    WalletsComponent,
    BankCardsComponent,
    BankCardsListComponent,
    WalletsListComponent,
    EntryPardakhtComponent,
    EntryArchiveComponent,
    EntryApproveComponent,
    EntryEditComponent,
    BankCardsEntryComponent
  ],
  providers: [
    InventoryService,
    EntryService,
    FactorService,
    //
    InventoryResolver,
    InventoryWalletResolver,
    InventoryBankCardResolver,
    AccWalletResolver,
    AccBankCardResolver,
    FactorResolver,
    EntryApproveResolver,
    EntryArchiveResolver,
    EntryPardakhtResolver,
    EntryResolver,
    BankCardEntryResolver
  ]
})
export class AccountantModule { }
