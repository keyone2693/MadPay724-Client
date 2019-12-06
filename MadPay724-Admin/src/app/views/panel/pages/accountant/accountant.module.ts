import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountantComponent } from './accountant.component';
import { AccountantDashboardComponent } from './pages/accountant-dashboard/accountant-dashboard.component';
import { AccountantRoutingModule } from './accountant-routing.module';
import { AccountantInventoryComponent } from './pages/accountant-inventory/accountant-inventory.component';
import { AccountantManageFactorsComponent } from './pages/accountant-factors/accountant-manage-factors/accountant-manage-factors.component';
import { AccountantFactorsReportComponent } from './pages/accountant-factors/accountant-factorsreport/accountant-factorsreport.component';

@NgModule({
  imports: [
    CommonModule,
    AccountantRoutingModule
  ],
  declarations: [
    AccountantComponent,
    AccountantDashboardComponent,
    AccountantFactorsReportComponent,
    AccountantInventoryComponent,
    AccountantManageFactorsComponent
  ]
})
export class AccountantModule { }
