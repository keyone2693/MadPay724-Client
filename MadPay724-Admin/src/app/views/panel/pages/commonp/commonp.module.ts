import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'ng2-file-upload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersianPipeModule } from 'src/app/shared/modules/common/persianPipe.module';
import { UserService } from 'src/app/core/_services/panel/user.service';
import { UserProfileResolver } from 'src/app/core/_base/resolvers/user/userprofile.resolver';
import { CommonpRoutingModule } from './commonp-routing.module';
import { UserChangePassComponent } from './profile/pages/user-change-pass/user-change-pass.component';
import { ProfileComponent } from './profile/profile.component';
import { UserChangePicComponent } from './profile/pages/user-change-pic/user-change-pic.component';
import { CommonpComponent } from './commonp.component';
import { PreventUnsavedGuard } from 'src/app/core/_base/guards/prevent-unsaved.guard';

@NgModule({
  imports: [
    CommonpRoutingModule,
    FileUploadModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PersianPipeModule
  ],
  declarations: [
    ProfileComponent,
    UserChangePassComponent,
    UserChangePicComponent,
    CommonpComponent
  ],
  providers: [
    PreventUnsavedGuard,
    UserService, //
    UserProfileResolver
  ]
})
export class CommonpModule { }
