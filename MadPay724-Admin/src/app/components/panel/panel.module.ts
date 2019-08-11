import { NgModule } from '@angular/core';
import { PanelComponent } from './panel.component';
import { PanelRoutingModule } from './panel-routing.module';
import { CommonModule } from '@angular/common';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { HasRoleDirective } from 'src/app/directives/hasRole.directive';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  imports: [
    PanelRoutingModule,
    CommonModule
  ],
  declarations: [
    PanelComponent,
    NavbarComponent,
    SidebarComponent,
    HasRoleDirective
  ],
  providers: [
    AuthGuard
  ]
})

export class PanelModule { }
