import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersManagementComponent } from './pages/users-management/users-management.component';
import { UsersListComponent } from './pages/users-management/pages/users-list/users-list.component';
import { AdminMaterialModule } from 'src/app/shared/modules/material/admin-material.module';
import { GenericTableModule } from 'src/app/shared/modules/common/genericTable.module';
import { PersianPipeModule } from 'src/app/shared/modules/common/persianPipe.module';
import { UserResolver } from 'src/app/core/_base/resolvers/admin/user.resolver';
import { UsersService } from 'src/app/core/_services/panel/admin/users.service';
import { UserRolesResolver } from 'src/app/core/_base/resolvers/admin/userRoles.resolver';
import { UsersRolesComponent } from './pages/users-management/pages/users-roles/users-roles.component';
import { GatesService } from 'src/app/core/_services/panel/admin/gatesService.service';
import { UsersBankcardsComponent } from './pages/users-management/pages/users-bankcards/users-bankcards.component';
import { UsersEasypaysComponent } from './pages/users-management/pages/users-easypays/users-easypays.component';
import { UsersFactorsComponent } from './pages/users-management/pages/users-factors/users-factors.component';
import { UsersGatesComponent } from './pages/users-management/pages/users-gates/users-gates.component';
import { UsersWalletsComponent } from './pages/users-management/pages/users-wallets/users-wallets.component';
import { TicketsComponent } from './pages/tickets/tickets.component';
import { TicketsDetailsComponent } from './pages/tickets/pages/tickets-details/tickets-details.component';
import { Ng5SliderModule } from 'ng5-slider';
import { ChatTicketComponent } from './pages/tickets/pages/tickets-details/pages/chat-ticket/chat-ticket.component';
import { ChatMessageTicketComponent } from './pages/tickets/pages/tickets-details/pages/chat-ticket/pages/chat-message-ticket/chat-message-ticket.component';
import { TicketDetailsResolver } from 'src/app/core/_base/resolvers/admin/ticketDetails.resolver';
import { NgScrollbarModule } from 'ngx-scrollbar';



@NgModule({
  imports: [
    AdminRoutingModule,
    CommonModule,
    FormsModule,
    AdminMaterialModule,
    ReactiveFormsModule,
    GenericTableModule,
    PersianPipeModule,
    Ng5SliderModule,
    NgScrollbarModule
  ], providers: [
    DatePipe,
    UsersService,
    GatesService,
    UserResolver,
    UserRolesResolver,
    TicketDetailsResolver
  ],
  declarations: [
    AdminComponent,
    DashboardComponent,
    UsersManagementComponent,
    UsersListComponent,
    UsersRolesComponent,
    UsersBankcardsComponent,
    UsersEasypaysComponent,
    UsersFactorsComponent,
    UsersGatesComponent,
    UsersWalletsComponent,
    TicketsComponent,
    TicketsDetailsComponent,
    ChatMessageTicketComponent,
    ChatTicketComponent
  ]
})
export class AdminModule { }
