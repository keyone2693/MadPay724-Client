import { NgModule } from '@angular/core';
import { PanelComponent } from './panel.component';
import { PanelRoutingModule } from './panel-routing.module';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProfileComponent } from './components/admin/userinfo/profile/profile.component';
import { DocumentComponent } from './components/admin/userinfo/document/document.component';
import { UserService } from './services/user.service';
import { PersianTimeAgoPipe } from 'persian-time-ago-pipe';
import { UserProfileResolver } from 'src/app/resolvers/userprofile.resolver';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    PanelRoutingModule,
    FormsModule,
    CommonModule
  ],
  declarations: [
    PanelComponent,
    DashboardComponent,
    ProfileComponent,
    DocumentComponent,
    NavbarComponent,
    SidebarComponent,
    PersianTimeAgoPipe
  ],
  providers: [
    UserService,
    UserProfileResolver
  ],
})

export class PanelModule { }
