import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './views/pages/main/main.component';
import { InfoComponent } from './views/pages/info/info.component';
import { MpPreloadingStrategy } from './core/_config/mpPreloadingStrategy';

const routes: Routes = [
  {
    path: 'main', component: MainComponent,
    loadChildren: () => import('./views/pages/main/main.module').then(p => p.MainModule),
    data: {preload: true}
  },
  {
    path: 'info', component: InfoComponent,
    loadChildren: () => import('./views/pages/info/info.module').then(p => p.InfoModule),
    data: { preload: true }
  },
  {
    path: '**' , redirectTo: 'main/home', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: MpPreloadingStrategy
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
