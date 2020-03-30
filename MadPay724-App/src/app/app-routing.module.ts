import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './views/pages/main/main.component';
import { InfoComponent } from './views/pages/info/info.component';
import { MpPreloadingStrategy } from './core/_config/mpPreloadingStrategy';
import { BlogComponent } from './views/pages/blog/blog.component';
import { NotFoundComponent } from './views/pages/notFound/notFound.component';

const routes: Routes = [
  {
    path: '', component: MainComponent,
    loadChildren: () => import('./views/pages/main/main.module').then(p => p.MainModule),
    data: {preload: true}
  },
  {
    path: 'info', component: InfoComponent,
    loadChildren: () => import('./views/pages/info/info.module').then(p => p.InfoModule),
    data: { preload: true }
  },
  {
    path: 'blog', component: BlogComponent,
    loadChildren: () => import('./views/pages/blog/blog.module').then(p => p.BlogModule),
    data: { preload: true }
  },
  {
    path: 'notfound', component: NotFoundComponent,
    loadChildren: () => import('./views/pages/notFound/notFound.module').then(p => p.NotFoundModule),
    data: { preload: true }
  },
  {
    path: '**', redirectTo: 'notfound/404', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    preloadingStrategy: MpPreloadingStrategy
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
