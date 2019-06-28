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
import { PreventUnsavedGuard } from 'src/app/guards/prevent-unsaved.guard';
import { UserChangePassComponent } from './components/admin/userinfo/profile/components/user-change-pass/user-change-pass.component';
import { UserChangePicComponent } from './components/admin/userinfo/profile/components/user-change-pic/user-change-pic.component';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  imports: [
    PanelRoutingModule,
    FormsModule,
    CommonModule,
    FileUploadModule
  ],
  declarations: [
    PanelComponent,
    DashboardComponent,
    ProfileComponent,
    DocumentComponent,
    NavbarComponent,
    SidebarComponent,
    UserChangePassComponent,
    UserChangePicComponent,
    PersianTimeAgoPipe
  ],
  providers: [
    UserService,
    UserProfileResolver,
    PreventUnsavedGuard
  ],
})

export class PanelModule { }
