import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { PanelComponent } from './panel.component';

const routes: Routes = [

  {
    path: 'admin', component: PanelComponent,
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule),
    data: { preload: true }
  },

  {
    path: 'user', component: PanelComponent,
    loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule),
    data: { preload: true }
  },

  {
    path: 'blog', component: PanelComponent,
    loadChildren: () => import('./pages/blog/blog.module').then(m => m.BlogModule),
    data: { preload: true }
  },

  {
    path: 'accountant', component: PanelComponent,
    loadChildren: () => import('./pages/accountant/accountant.module').then(m => m.AccountantModule),
    data: { preload: true }
  },
  {
    path: 'common', component: PanelComponent,
    loadChildren: () => import('./pages/commonp/commonp.module').then(m => m.CommonpModule),
    data: { preload: true }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }
