import { NgModule } from '@angular/core';
import { PanelComponent } from './panel.component';
import { PanelRoutingModule } from './panel-routing.module';
import { CommonModule } from '@angular/common';
import { HasRoleModule } from 'src/app/Shared/Modules/hasRole/hasRole.module';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { AuthGuard } from 'src/app/core/_base/guards/auth.guard';
import { MatTooltipModule } from '@angular/material';
import { NotificationComponent } from './layout/navbar/pages/notification/notification.component';

@NgModule({
  imports: [
    PanelRoutingModule,
    CommonModule,
    HasRoleModule,
    MatTooltipModule
  ],
  declarations: [
    PanelComponent,
    NavbarComponent,
    SidebarComponent,
    NotificationComponent
  ],
  providers: [
    AuthGuard
  ]
})

export class PanelModule { }
