import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from '../auth.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

export const authRoutes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {path: '', component: LoginComponent},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent}
    ]
   },
];
