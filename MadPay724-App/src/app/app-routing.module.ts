import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './views/pages/main/main.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: 'main', component: AppComponent,
    loadChildren: () => import('./views/pages/main/main.module').then(p => p.MainModule),
    data: {preload: true}
  },
  {
    path: '**' , redirectTo: 'main/home', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
