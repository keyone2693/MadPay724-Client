import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'ng2-file-upload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersianPipeModule } from 'src/app/shared/modules/common/persianPipe.module';
import { UserService } from 'src/app/core/_services/panel/user.service';
import { UserProfileResolver } from 'src/app/core/_base/resolvers/user/userprofile.resolver';
import { CommonpRoutingModule } from './commonp-routing.module';
import { CommonpComponent } from './commonp.component';
import { PreventUnsavedGuard } from 'src/app/core/_base/guards/prevent-unsaved.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { UserChangePassComponent } from './pages/profile/pages/user-change-pass/user-change-pass.component';
import { UserChangePicComponent } from './pages/profile/pages/user-change-pic/user-change-pic.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { BlogDashboardComponent } from './pages/blog-dashboard/blog-dashboard.component';
import { AccountantDashboardComponent } from './pages/accountant-dashboard/accountant-dashboard.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { ChartistModule } from 'ng-chartist';
import { DashboardService } from 'src/app/core/_services/common/dashboard.service';
import { UserDashboardResolver } from 'src/app/core/_base/resolvers/common/userDashboard.resolver';

@NgModule({
  imports: [
    CommonpRoutingModule,
    FileUploadModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PersianPipeModule,
    ChartistModule
  ],
  declarations: [
    ProfileComponent,
    UserChangePassComponent,
    UserChangePicComponent,
    CommonpComponent,
    AdminDashboardComponent,
    AccountantDashboardComponent,
    BlogDashboardComponent,
    UserDashboardComponent
  ],
  providers: [
    DashboardService,
    UserDashboardResolver,
    PreventUnsavedGuard,
    UserService, //
    UserProfileResolver
  ]
})
export class CommonpModule { }
