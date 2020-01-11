import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
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
import { DigitOnlyModule } from '@uiowa/digit-only';
import { AccountantMaterialModule } from 'src/app/shared/modules/material/accountant-material.module';
import { InventoryBankCardResolver } from 'src/app/core/_base/resolvers/accountant/inventoryBankCard.resolver';
import { InventoryWalletResolver } from 'src/app/core/_base/resolvers/accountant/inventoryWallet.resolver';
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
import { WalletsEntryComponent } from './pages/financial/wallets/pages/wallets-entry/wallets-entry.component';
import { WalletsFactorsComponent } from './pages/financial/wallets/pages/wallets-factors/wallets-factors.component';
import { FactorEditComponent } from './pages/factors/manage-factors/pages/factor-edit/factor-edit.component';
import { Ng5SliderModule } from 'ng5-slider';
import { GatesComponent } from './pages/financial/gates/gates.component';
import { GateFactorsComponent } from './pages/financial/gates/pages/gate-factors/gate-factors.component';
import { GateAccService } from 'src/app/core/_services/panel/accountant/gateAccService.service';
import { WalletsGatesComponent } from './pages/financial/wallets/pages/wallets-gates/wallets-gates.component';
import { GenericTableModule } from 'src/app/shared/modules/common/genericTable.module';
import { ButtonMPComponent } from 'src/app/shared/component/button-mp/button-mp.component';
import { InputMpComponent } from 'src/app/shared/component/input-mp/input-mp.component';
import { CheckboxMPComponent } from 'src/app/shared/component/checkbox-mp/checkbox-mp.component';
import { HtmlMpComponent } from 'src/app/shared/component/html-mp/html-mp.component';

@NgModule({
  imports: [
    CommonModule,
    AccountantRoutingModule,
    FormsModule, ReactiveFormsModule,
    AccountantMaterialModule,
    DigitOnlyModule,
    SweetAlert2Module.forRoot(),
    HasRoleModule,
    PersianPipeModule,
    Ng5SliderModule,
    GenericTableModule
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
    BankCardsEntryComponent,
    WalletsEntryComponent,
    WalletsFactorsComponent,
    FactorEditComponent,
    GatesComponent,
    GateFactorsComponent,
    WalletsGatesComponent
  ],
  providers: [
    DatePipe,
    InventoryService,
    EntryService,
    FactorService,
    GateAccService,
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
