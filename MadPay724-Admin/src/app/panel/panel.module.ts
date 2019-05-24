import { NgModule } from '@angular/core';
import { PanelComponent } from './panel.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { panelRoutes } from './routes/routes';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(panelRoutes)
  ],
  declarations: [PanelComponent]
})
export class PanelModule { }
