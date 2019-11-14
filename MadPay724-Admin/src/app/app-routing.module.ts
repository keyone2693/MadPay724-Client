import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: 'auth', redirectTo: '/auth/login', pathMatch: 'full'},

  {path: 'auth',  loadChildren : () => import('./views/auth/auth.module').then(m => m.AuthModule)},

  {path: 'panel',
    loadChildren: () => import('./views/panel/panel.module').then(m => m.PanelModule)},

  {path: '**', redirectTo: '/auth/login', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
