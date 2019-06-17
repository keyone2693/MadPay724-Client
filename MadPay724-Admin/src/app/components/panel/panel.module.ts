import { NgModule } from '@angular/core';
import { PanelComponent } from './panel.component';
import { PanelRoutingModule } from './panel-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  imports: [
    PanelRoutingModule
  ],
  declarations: [
    PanelComponent,
    DashboardComponent,
    NavbarComponent,
    SidebarComponent
  ]
})

export class PanelModule { }
