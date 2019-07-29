import { NgModule } from '@angular/core';
import { PanelComponent } from './panel.component';
import { PanelRoutingModule } from './panel-routing.module';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PersianTimeAgoPipe } from 'persian-time-ago-pipe';
import { UserProfileResolver } from 'src/app/resolvers/userprofile.resolver';
import { CommonModule } from '@angular/common';
import { PreventUnsavedGuard } from 'src/app/guards/prevent-unsaved.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { UserService } from 'src/app/Services/panel/user.service';
import { UsersManagementComponent } from './components/admin/users-management/users-management.component';
import { UserChangePassComponent } from './components/user/userinfo/profile/components/user-change-pass/user-change-pass.component';
import { DocumentComponent } from './components/user/userinfo/document/document.component';
import { UserChangePicComponent } from './components/user/userinfo/profile/components/user-change-pic/user-change-pic.component';
import { ProfileComponent } from './components/user/userinfo/profile/profile.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

@NgModule({
  imports: [
    PanelRoutingModule,
    FormsModule,
    ReactiveFormsModule,
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
    UsersManagementComponent,
    PersianTimeAgoPipe
  ],
  providers: [
    UserService,
    UserProfileResolver,
    AuthGuard,
    PreventUnsavedGuard
  ],
})

export class PanelModule { }
