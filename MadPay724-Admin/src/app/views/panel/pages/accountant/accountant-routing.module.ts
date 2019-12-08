import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from 'src/app/core/_base/guards/auth.guard';
import { AccountantComponent } from './accountant.component';
import { AccountantDashboardComponent } from './pages/accountant-dashboard/accountant-dashboard.component';
import { AccountantFactorsReportComponent } from './pages/accountant-factors/accountant-factorsreport/accountant-factorsreport.component';
import { AccountantManageFactorsComponent } from './pages/accountant-factors/accountant-manage-factors/accountant-manage-factors.component';
import { InventoryResolver } from 'src/app/core/_base/resolvers/accountant/inventory.resolver';
import { InventoryWalletResolver } from 'src/app/core/_base/resolvers/accountant/inventoryWallet.resolver';
import { InventoryBankCardResolver } from 'src/app/core/_base/resolvers/accountant/inventoryBankCard.resolver';
import { AccBankCardResolver } from 'src/app/core/_base/resolvers/accountant/accBankcard.resolver';
import { AccWalletResolver } from 'src/app/core/_base/resolvers/accountant/accWallet.resolver';
import { AccountantInventoryComponent } from './pages/accountant-financial/accountant-inventory/accountant-inventory.component';
import { InventoryWalletListComponent } from './pages/accountant-financial/accountant-inventory/pages/inventory-wallet-list/inventory-wallet-list.component';
import { InventoryBankCardListComponent } from './pages/accountant-financial/accountant-inventory/pages/inventory-bankCard-list/inventory-bankCard-list.component';
import { AccountantWalletsComponent } from './pages/accountant-financial/accountant-wallets/accountant-wallets.component';
import { AccountantBankCardsComponent } from './pages/accountant-financial/accountant-bankCards/accountant-bankCards.component';
import { AccountantEntryComponent } from './pages/accountant-entry/accountant-entry/accountant-entry.component';
import { AccountantEntryAddComponent } from './pages/accountant-entry/accountant-entry-add/accountant-entry-add.component';
import { AccountantEntryPardakhtComponent } from './pages/accountant-entry/accountant-entry-pardakht/accountant-entry-pardakht.component';
import { AccountantEntryApproveComponent } from './pages/accountant-entry/accountant-entry-approve/accountant-entry-approve.component';
import { AccountantEntryArchiveComponent } from './pages/accountant-entry/accountant-entry-archive/accountant-entry-archive.component';

const routes: Routes = [
    {
        path: '',
        component: AccountantComponent,
        children: [
            {
                path: 'dashboard', canActivate: [AuthGuard], component: AccountantDashboardComponent,
                data: { roles: ['Accountant', 'Admin'], title: ['داشبورد حسابدار'] }
            },
            //
            {
                path: 'entryapprove', canActivate: [AuthGuard],
                resolve: { entriesapprove: EntryApproveResolver },
                component: AccountantEntryApproveComponent,
                data: { roles: ['Accountant', 'Admin'], title: ['گزارش فاکتورها'] }
            },
            {
                path: 'entrypardakht', canActivate: [AuthGuard],
                resolve: { entriespardakht: EntryPardakhtResolver },
                component: AccountantEntryPardakhtComponent,
                data: { roles: ['Accountant', 'Admin'], title: ['گزارش فاکتورها'] }
            },
            {
                path: 'entryarchive', canActivate: [AuthGuard],
                resolve: { entriesarchive: EntryArchiveResolver },
                component: AccountantEntryArchiveComponent,
                data: { roles: ['Accountant', 'Admin'], title: ['گزارش فاکتورها'] }
            },
            //
            {
                path: 'inventory', canActivate: [AuthGuard], 
                resolve: { inventories: InventoryResolver},
                component: AccountantInventoryComponent,
                data: { roles: ['Accountant', 'Admin'], title: ['مدیریت موجودی ها'] }
            },
            {
                path: 'inventorywallet/:userId', canActivate: [AuthGuard],
                resolve: { inventorywallets: InventoryWalletResolver },
                component: InventoryWalletListComponent,
                data: { roles: ['Accountant', 'Admin'], title: ['کیف پول های'] }
            },
            {
                path: 'inventorybankcard/:userId', canActivate: [AuthGuard],
                resolve: { inventorybankcards: InventoryBankCardResolver },
                component: InventoryBankCardListComponent,
                data: { roles: ['Accountant', 'Admin'], title: ['کارت های بانکی'] }
            },
            {
                path: 'bankcards', canActivate: [AuthGuard],
                resolve: { bankcards: AccBankCardResolver},
                component: AccountantBankCardsComponent,
                data: { roles: ['Accountant', 'Admin'], title: ['مدیریت کیف پول ها'] }
            },
            {
                path: 'wallets', canActivate: [AuthGuard],
                resolve: { wallets: AccWalletResolver },
                component: AccountantWalletsComponent,
                data: { roles: ['Accountant', 'Admin'], title: ['مدیریت کارت های بانکی'] }
            },
            
            //-----------------
            {
                path: 'factorsreport', canActivate: [AuthGuard], component: AccountantFactorsReportComponent,
                data: { roles: ['Accountant', 'Admin'], title: ['گزارش فاکتورها'] }
            },
            //
            {
                path: 'factors', canActivate: [AuthGuard],
                //  resolve: { blogs:  },
                component: AccountantManageFactorsComponent,
                data: { roles: ['Admin', 'Accountant'], title: ['مدیریت فاکتورها'] }
            },
            {
                path: 'factors/edit/:factId', canActivate: [AuthGuard],
                //  resolve: { blogs:  },
                component: AccountantManageFactorsComponent,
                data: { roles: ['Admin', 'Accountant'], title: ['ویرایش فاکتور '] },
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountantRoutingModule { }
