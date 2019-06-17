import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PanelComponent } from './panel.component';
import { DashboardComponent } from './components/components/dashboard/dashboard.component';
import { ProfileComponent } from './components/components/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: PanelComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'profile', component: ProfileComponent}
    ]
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }
