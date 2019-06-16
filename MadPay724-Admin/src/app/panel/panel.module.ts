import { NgModule } from '@angular/core';
import { PanelComponent } from './panel.component';
import { PanelRoutingModule } from './panel-routing.module';

@NgModule({
  imports: [
    PanelRoutingModule,
  ],
  declarations: [PanelComponent]
})
export class PanelModule { }
