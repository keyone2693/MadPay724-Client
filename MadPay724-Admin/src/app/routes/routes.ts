import { Routes, RouterModule } from '@angular/router';

export const adminRoutes: Routes = [
  {
    path: '', redirectTo: '/login', pathMatch: 'full'
   },
   {
    path: 'login', redirectTo: '/login', pathMatch: 'full'
   },
   {
    path: 'panel', redirectTo: '/panel', pathMatch: 'full'
   }
];
