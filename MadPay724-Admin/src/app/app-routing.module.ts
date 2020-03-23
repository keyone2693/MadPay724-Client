import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { MpPreloadingStrategy } from './core/_config/mpPreloadingStrategy';

const routes: Routes = [
  { path: 'auth', redirectTo: '/auth/login', pathMatch: 'full'},

  {
    path: 'auth', loadChildren: () => import('./views/auth/auth.module').then(m => m.AuthModule),
    data: { preload: false}},

  {path: 'panel',
    loadChildren: () => import('./views/panel/panel.module').then(m => m.PanelModule),
    data: { preload: false }},

  {path: '**', redirectTo: '/auth/login', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: MpPreloadingStrategy
  })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
