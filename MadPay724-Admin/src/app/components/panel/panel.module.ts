import { NgModule } from '@angular/core';
import { PanelComponent } from './panel.component';
import { PanelRoutingModule } from './panel-routing.module';
import { DashboardComponent } from './components/components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProfileComponent } from './components/components/userinfo/profile/profile.component';
import { DocumentsComponent } from './components/components/userinfo/documents/documents.component';

@NgModule({
  imports: [
    PanelRoutingModule
  ],
  declarations: [
    PanelComponent,
    DashboardComponent,
    ProfileComponent,
    DocumentsComponent,
    NavbarComponent,
    SidebarComponent
  ]
})

export class PanelModule { }
