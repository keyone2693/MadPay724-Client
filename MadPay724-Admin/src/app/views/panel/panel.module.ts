import { NgModule } from '@angular/core';
import { PanelComponent } from './panel.component';
import { PanelRoutingModule } from './panel-routing.module';
import { CommonModule } from '@angular/common';
import { HasRoleModule } from 'src/app/Shared/Modules/hasRole/hasRole.module';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { AuthGuard } from 'src/app/core/_base/guards/auth.guard';

import { NotificationComponent } from './layout/navbar/pages/notification/notification.component';
import { FaMatPaginatorIntl } from '../../Shared/Modules/material/faMatPaginatorIntl';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { ChatComponent } from './layout/navbar/pages/chat/chat.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminChatComponent } from './layout/navbar/pages/chat/pages/admin-chat/admin-chat.component';
import { UserChatComponent } from './layout/navbar/pages/chat/pages/user-chat/user-chat.component';
import { PersianPipeModule } from 'src/app/shared/modules/common/persianPipe.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";
import { environment } from 'src/environments/environment.prod';

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(environment.googleClientId)
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider(environment.facebookAppId)
  }
]);
export function provideConfig() {
  return config;
}

@NgModule({
  imports: [
    PanelRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule ,
    HasRoleModule,
    MatTooltipModule,
    NgScrollbarModule,
    PersianPipeModule,
    SocialLoginModule
  ],
  declarations: [
    PanelComponent,
    NavbarComponent,
    SidebarComponent,
    NotificationComponent,
    ChatComponent,
    UserChatComponent,
    AdminChatComponent
  ],
  providers: [
    AuthGuard,
    { provide: MatPaginatorIntl, useClass: FaMatPaginatorIntl },
    { provide: MAT_RADIO_DEFAULT_OPTIONS, useValue: { color: 'warn' } },
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ]
})

export class PanelModule { }
