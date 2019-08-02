import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PanelComponent } from './panel.component';

const routes: Routes = [

  {path: 'admin',  component: PanelComponent,
   loadChildren : () => import('./components/admin/admin.module').then(m => m.AdminModule)},

  {path: 'user',  component: PanelComponent,
    loadChildren : () => import('./components/user/user.module').then(m => m.UserModule)},

  {path: 'blog',  component: PanelComponent,
   loadChildren : () => import('./components/blog/blog.module').then(m => m.BlogModule)},

  {path: 'accountant',  component: PanelComponent,
   loadChildren : () => import('./components/accountant/accountant.module').then(m => m.AccountantModule)},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }
