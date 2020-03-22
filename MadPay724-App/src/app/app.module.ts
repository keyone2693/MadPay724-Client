import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {
  NgxUiLoaderModule,
  NgxUiLoaderRouterModule, NgxUiLoaderHttpModule, POSITION, SPINNER, PB_DIRECTION, NgxUiLoaderConfig
} from 'ngx-ui-loader';
import { NotyfToast } from './Shared/Animation/notyf';
import { ErrorInterceptorProvider } from './core/_config/error.interceptor';
import { TitleService } from './core/_services/common/title.service';
import { CustomRouteSerializer } from './shared/helpers/customRouteSerializer';
import { MpPreloadingStrategy } from './core/_config/mpPreloadingStrategy';

import { environment } from 'src/environments/environment.prod';


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
  pbThickness: 2
  // , overlayColor: 'rgba(40,40,40,.1)'
};
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
    MpPreloadingStrategy,
    ErrorInterceptorProvider,
    TitleService
  ],
  entryComponents: [NotyfToast],
  bootstrap: [AppComponent]
})
export class AppModule { }
