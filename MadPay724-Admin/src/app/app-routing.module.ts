import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: 'auth', redirectTo: '/auth/login', pathMatch: 'full'},

  {path: 'auth', loadChildren : () => import('./auth/auth.module').then(m => m.AuthModule)},

  {path: 'panel', loadChildren : () => import('./panel/panel.module').then(m => m.PanelModule)},

  {path: '**', redirectTo: '/auth/login', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
