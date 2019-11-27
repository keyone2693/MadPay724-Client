import { NgModule } from '@angular/core';
import { PanelComponent } from './panel.component';
import { PanelRoutingModule } from './panel-routing.module';
import { CommonModule } from '@angular/common';
import { HasRoleModule } from 'src/app/Shared/Modules/hasRole/hasRole.module';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { AuthGuard } from 'src/app/core/_base/guards/auth.guard';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment.prod';


@NgModule({
  imports: [
    PanelRoutingModule,
    CommonModule,
    HasRoleModule,
    StoreModule.forRoot({}),
    environment.development ? StoreDevtoolsModule.instrument({ maxAge: 10 }) : []
  ],
  declarations: [
    PanelComponent,
    NavbarComponent,
    SidebarComponent
  ],
  providers: [
    AuthGuard
  ]
})

export class PanelModule { }
