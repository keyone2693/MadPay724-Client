import { NgModule } from '@angular/core';
import { SimplemattableModule } from 'simplemattable';
import { ButtonMPComponent } from '../../component/button-mp/button-mp.component';
import { CheckboxMPComponent } from '../../component/checkbox-mp/checkbox-mp.component';
import { InputMpComponent } from '../../component/input-mp/input-mp.component';
import { HtmlMpComponent } from '../../component/html-mp/html-mp.component';

@NgModule({
  imports: [
    SimplemattableModule,
  ], entryComponents:
    [ButtonMPComponent,
      CheckboxMPComponent,
      InputMpComponent,
      HtmlMpComponent]
})
export class GenericTableModule { }
