import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginRedirectGuard } from 'src/app/core/_base/guards/login-redirect.guard';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {path: 'login', canActivate: [LoginRedirectGuard], component: LoginComponent,
      data: {title: ['ورود به پنل کاربری']}},
      {path: 'register', component: RegisterComponent,
      data: {title: ['ثبت نام در مادپی']}}
    ]
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
