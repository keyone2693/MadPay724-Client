import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AuthGuard } from 'src/app/core/_base/guards/auth.guard';
import { UsersManagementComponent } from './pages/users-management/users-management.component';
import { UserResolver } from 'src/app/core/_base/resolvers/admin/user.resolver';
import { UserRolesResolver } from 'src/app/core/_base/resolvers/admin/userRoles.resolver';
import { UsersRolesComponent } from './pages/users-management/pages/users-roles/users-roles.component';
import { UsersGatesComponent } from './pages/users-management/pages/users-gates/users-gates.component';
import { TicketsDetailsComponent } from './pages/tickets/pages/tickets-details/tickets-details.component';
import { TicketsComponent } from './pages/tickets/tickets.component';
import { TicketDetailsResolver } from 'src/app/core/_base/resolvers/admin/ticketDetails.resolver';
import { DocumentsComponent } from './pages/documents/documents.component';
import { DocumentsDetailsComponent } from './pages/documents/pages/documents-details/documents-details.component';
import { DocumentResolver } from 'src/app/core/_base/resolvers/admin/document.resolver';
import { FileManagerComponent } from './pages/file-manager/file-manager.component';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
          
          {
            path: 'users/management', canActivate: [AuthGuard],
            resolve: { users: UserResolver },
            component: UsersManagementComponent,
            data: { roles: ['Admin'], title: ['مدیریت کاربران'] }
          },
          {
            path: 'users/:userId/roles', canActivate: [AuthGuard],
            resolve: { roles: UserRolesResolver },
            component: UsersRolesComponent,
            data: { roles: ['Admin'], title: ['مدیریت نقش های کاربران'] }
          },
          //
          {
            path: 'users/:userId/gates', canActivate: [AuthGuard],
            component: UsersGatesComponent,
            data: { roles: ['Admin'], title: ['مدیریت درگاه های کاربران'] }
          },
          //documents
          {
            path: 'documents/management', canActivate: [AuthGuard],
            component: DocumentsComponent,
            data: { roles: ['Admin'], title: ['مدیریت مدارک '] }
          },
          {
            path: 'documents/:docId/details', canActivate: [AuthGuard],
            resolve: { document: DocumentResolver },
            component: DocumentsDetailsComponent,
            data: { roles: ['Admin'], title: ['ویرایش و جزییات مدرک'] }
          },
          //ticket
          {
            path: 'tickets/management', canActivate: [AuthGuard],
            component: TicketsComponent,
            data: { roles: ['Admin'], title: ['مدیریت تیکت ها'] }
          },
          {
            path: 'tickets/:ticketId/detail', canActivate: [AuthGuard],
            resolve: { ticket: TicketDetailsResolver },
            component: TicketsDetailsComponent,
            data: { roles: ['Admin'], title: ['مدیریت تیکت ها'] }
          },
          //filemanager
          {
            path: 'file/management', canActivate: [AuthGuard],
            component: FileManagerComponent,
            data: { roles: ['Admin'], title: ['فایل منیجر'] }
          }
        ]
       }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
