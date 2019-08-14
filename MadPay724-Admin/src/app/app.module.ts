import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorInterceptorProvider } from './Services/error.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import {
  NgxUiLoaderModule, NgxUiLoaderConfig, POSITION, SPINNER, PB_DIRECTION,
  NgxUiLoaderRouterModule, NgxUiLoaderHttpModule
} from 'ngx-ui-loader';
import { AuthService } from './Services/auth/auth.service';
import { TitleService } from './Services/common/title.service';
import { NotyfToast } from './Shared/Animation/notyf';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  pbColor: 'red',
  //
  bgsColor: 'red',
  bgsPosition: POSITION.bottomRight,
  bgsSize: 70,
  //
  fgsPosition: POSITION.bottomRight,
  fgsSize: 70,
  fgsColor: 'red',
  bgsType: SPINNER.doubleBounce,
  fgsType: SPINNER.doubleBounce,
  pbDirection: PB_DIRECTION.leftToRight,
  pbThickness: 3
  // , overlayColor: 'rgba(40,40,40,.1)'
};

export function tokenGet() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    NotyfToast
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-center',
      preventDuplicates: true,
      progressBar: true,
      progressAnimation: 'decreasing'
    }),
    HttpClientModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderRouterModule,
    NgxUiLoaderHttpModule.forRoot({ showForeground: true })
  ],
  providers: [
    ErrorInterceptorProvider,
    TitleService,
    AuthService
  ],
  entryComponents: [NotyfToast],
  bootstrap: [AppComponent]
})
export class AppModule { }
