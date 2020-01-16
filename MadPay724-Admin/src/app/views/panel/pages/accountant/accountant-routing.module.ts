import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from 'src/app/core/_base/guards/auth.guard';
import { AccountantComponent } from './accountant.component';
import { FactorsReportComponent } from './pages/factors/factorsreport/factorsreport.component';
import { ManageFactorsComponent } from './pages/factors/manage-factors/manage-factors.component';
import { InventoryResolver } from 'src/app/core/_base/resolvers/accountant/inventory.resolver';
import { InventoryWalletResolver } from 'src/app/core/_base/resolvers/accountant/inventoryWallet.resolver';
import { InventoryBankCardResolver } from 'src/app/core/_base/resolvers/accountant/inventoryBankCard.resolver';
import { AccBankCardResolver } from 'src/app/core/_base/resolvers/accountant/accBankcard.resolver';
import { AccWalletResolver } from 'src/app/core/_base/resolvers/accountant/accWallet.resolver';
import { InventoryComponent } from './pages/financial/inventory/inventory.component';
import { InventoryWalletListComponent } from './pages/financial/inventory/pages/inventory-wallet-list/inventory-wallet-list.component';
import { InventoryBankCardListComponent } from './pages/financial/inventory/pages/inventory-bankCard-list/inventory-bankCard-list.component';
import { WalletsComponent } from './pages/financial/wallets/wallets.component';
import { BankCardsComponent } from './pages/financial/bankCards/bankCards.component';
import { EntryPardakhtComponent } from './pages/entry/entry-pardakht/entry-pardakht.component';
import { EntryApproveComponent } from './pages/entry/entry-approve/entry-approve.component';
import { EntryArchiveComponent } from './pages/entry/entry-archive/entry-archive.component';
import { EntryApproveResolver } from 'src/app/core/_base/resolvers/accountant/entryApprove.resolver';
import { EntryPardakhtResolver } from 'src/app/core/_base/resolvers/accountant/entryPardakht.resolver';
import { EntryArchiveResolver } from 'src/app/core/_base/resolvers/accountant/entryArchive.resolver';
import { EntryResolver } from 'src/app/core/_base/resolvers/accountant/entry.resolver';
import { EntryEditComponent } from './pages/entry/entry-edit/entry-edit.component';
import { BankCardsEntryComponent } from './pages/financial/bankCards/pages/bankCards-entry/bankCards-entry.component';
import { WalletsEntryComponent } from './pages/financial/wallets/pages/wallets-entry/wallets-entry.component';
import { WalletsFactorsComponent } from './pages/financial/wallets/pages/wallets-factors/wallets-factors.component';
import { FactorEditComponent } from './pages/factors/manage-factors/pages/factor-edit/factor-edit.component';
import { FactorResolver } from 'src/app/core/_base/resolvers/accountant/factor.resolver';
import { GatesComponent } from './pages/financial/gates/gates.component';
import { GateFactorsComponent } from './pages/financial/gates/pages/gate-factors/gate-factors.component';
import { WalletsGatesComponent } from './pages/financial/wallets/pages/wallets-gates/wallets-gates.component';

const routes: Routes = [
    {
        path: '',
        component: AccountantComponent,
        children: [
            
            //
            {
                path: 'entryapprove', canActivate: [AuthGuard],
                resolve: { entriesapprove: EntryApproveResolver },
                component: EntryApproveComponent,
                data: { roles: ['Accountant', 'Admin'], title: ['واریزی های تایید نشده'] }
            },
            {
                path: 'entrypardakht', canActivate: [AuthGuard],
                resolve: { entriespardakht: EntryPardakhtResolver },
                component: EntryPardakhtComponent,
                data: { roles: ['Accountant', 'Admin'], title: ['واریزی های پرداخت نشده'] }
            },
            {
                path: 'entryarchive', canActivate: [AuthGuard],
                resolve: { entriesarchive: EntryArchiveResolver },
                component: EntryArchiveComponent,
                data: { roles: ['Accountant', 'Admin'], title: ['ارشیو واریزی ها'] }
            },
            {
                path: 'entryedit/:entryId', canActivate: [AuthGuard],
                resolve: { entry: EntryResolver },
                component: EntryEditComponent,
                data: { roles: ['Accountant', 'Admin'], title: ['جزییات،ویرایش واریزی'] }
            },

            //
            {
                path: 'inventory', canActivate: [AuthGuard], 
                resolve: { inventories: InventoryResolver},
                component: InventoryComponent,
                data: { roles: ['Accountant', 'Admin'], title: ['مدیریت موجودی ها'] }
            },
            {
                path: 'inventory/:userId/wallets', canActivate: [AuthGuard],
                resolve: { inventorywallets: InventoryWalletResolver },
                component: InventoryWalletListComponent,
                data: { roles: ['Accountant', 'Admin'], title: ['کیف پول های'] }
            },
            {
                path: 'inventory/:userId/bankcards', canActivate: [AuthGuard],
                resolve: { inventorybankcards: InventoryBankCardResolver },
                component: InventoryBankCardListComponent,
                data: { roles: ['Accountant', 'Admin'], title: ['کارت های بانکی'] }
            },
            {
                path: 'bankcards', canActivate: [AuthGuard],
                resolve: { bankcards: AccBankCardResolver},
                component: BankCardsComponent,
                data: { roles: ['Accountant', 'Admin'], title: ['مدیریت کیف پول ها'] }
            },
            {
                path: 'bankcards/:bankcardId/entry', canActivate: [AuthGuard],
                //resolve: { entries: BankCardEntryResolver },
                component: BankCardsEntryComponent,
                data: { roles: ['Accountant', 'Admin'], title: ['واریزی های کارت بانکی'] }
            },
            {
                path: 'wallets', canActivate: [AuthGuard],
                resolve: { wallets: AccWalletResolver },
                component: WalletsComponent,
                data: { roles: ['Accountant', 'Admin'], title: ['مدیریت کارت های بانکی'] }
            },
            {
                path: 'wallets/:walletId/entry', canActivate: [AuthGuard],
                component: WalletsEntryComponent,
                data: { roles: ['Accountant', 'Admin'], title: ['واریزی های کیف پول'] }
            },
            {
                path: 'wallets/:walletId/factors', canActivate: [AuthGuard],
                component: WalletsFactorsComponent,
                data: { roles: ['Accountant', 'Admin'], title: ['فاکتور های کیف پول'] }
            },
            {
                path: 'wallets/:walletId/gates', canActivate: [AuthGuard],
                component: WalletsGatesComponent,
                data: { roles: ['Accountant', 'Admin'], title: ['درگاه های کیف پول'] }
            },
            {
                path: 'gates', canActivate: [AuthGuard],
                component: GatesComponent,
                data: { roles: ['Accountant', 'Admin'], title: ['مدیریت درگاه ها'] }
            },
            {
                path: 'gates/:gateId/factors', canActivate: [AuthGuard],
                component: GateFactorsComponent,
                data: { roles: ['Accountant', 'Admin'], title: ['فاکتور های درگاه'] }
            },
            //-----------------
            {
                path: 'factorsreport', canActivate: [AuthGuard], component: FactorsReportComponent,
                data: { roles: ['Accountant', 'Admin'], title: ['گزارش فاکتورها'] }
            },
            //
            {
                path: 'factors', canActivate: [AuthGuard],
                //  resolve: { blogs:  },
                component: ManageFactorsComponent,
                data: { roles: ['Admin', 'Accountant'], title: ['مدیریت فاکتورها'] }
            },
            {
                path: 'factors/:factorId/detail', canActivate: [AuthGuard],
                resolve: { factorDetail: FactorResolver },
                component: FactorEditComponent,
                data: { roles: ['Admin', 'Accountant'], title: ['جزییات و ویرایش فاکتور '] },
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountantRoutingModule { }
