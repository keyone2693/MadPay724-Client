import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginRedirectGuard } from 'src/app/core/_base/guards/login-redirect.guard';
import { NgOtpInputModule } from 'ng-otp-input';
import { CountdownModule } from 'ngx-countdown';
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("302518043380-t9r6c1j5e245a6n7v8ii59842cta188d.apps.googleusercontent.com")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("505724516783402")
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  imports: [
    AuthRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgOtpInputModule,
    CountdownModule ,
    SocialLoginModule
  ],
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent
  ],
  providers: [
    LoginRedirectGuard,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
})
export class AuthModule { }
