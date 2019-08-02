import { NgModule } from '@angular/core';
import { PanelComponent } from './panel.component';
import { PanelRoutingModule } from './panel-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { HasRoleDirective } from 'src/app/directives/hasRole.directive';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './components/admin/components/dashboard/dashboard.component';



@NgModule({
  imports: [
    PanelRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  declarations: [
    PanelComponent,
    NavbarComponent,
    SidebarComponent,
    HasRoleDirective
  ],
  providers: [
    AuthGuard,
  ]
})

export class PanelModule { }
