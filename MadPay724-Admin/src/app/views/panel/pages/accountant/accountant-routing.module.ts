import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from 'src/app/core/_base/guards/auth.guard';
import { AccountantComponent } from './accountant.component';
import { AccountantDashboardComponent } from './pages/accountant-dashboard/accountant-dashboard.component';
import { AccountantInventoryComponent } from './pages/accountant-inventory/accountant-inventory.component';
import { AccountantFactorsReportComponent } from './pages/accountant-factors/accountant-factorsreport/accountant-factorsreport.component';
import { AccountantManageFactorsComponent } from './pages/accountant-factors/accountant-manage-factors/accountant-manage-factors.component';
import { InventoryResolver } from 'src/app/core/_base/resolvers/accountant/inventory.resolver';
import { InventoryWalletResolver } from 'src/app/core/_base/resolvers/accountant/inventoryWallet.resolver';
import { InventoryBankCardResolver } from 'src/app/core/_base/resolvers/accountant/inventoryBankCard.resolver';
import { InventoryWalletListComponent } from './pages/accountant-inventory/pages/inventory-wallet-list/inventory-wallet-list.component';
import { InventoryBankCardListComponent } from './pages/accountant-inventory/pages/inventory-bankcard-list/inventory-bankcard-list.component';

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
            //
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
