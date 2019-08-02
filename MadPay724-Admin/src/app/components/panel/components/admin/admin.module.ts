import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { UsersManagementComponent } from './components/users-management/users-management.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    AdminRoutingModule,
    CommonModule
  ],
  declarations: [
    AdminComponent,
    DashboardComponent,
    UsersManagementComponent
  ]
})
export class AdminModule { }
