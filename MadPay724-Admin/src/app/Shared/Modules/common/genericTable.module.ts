import { NgModule } from '@angular/core';
import { SimplemattableModule } from 'simplemattable';
import { ClipboardModule } from 'ngx-clipboard';
import { ButtonMPComponent } from '../../component/button-mp/button-mp.component';
import { CheckboxMPComponent } from '../../component/checkbox-mp/checkbox-mp.component';
import { InputMpComponent } from '../../component/input-mp/input-mp.component';
import { HtmlMpComponent } from '../../component/html-mp/html-mp.component';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatTooltipModule, MatInputModule } from '@angular/material';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatInputModule,
    SimplemattableModule,
    ClipboardModule
  ], declarations: [
    ButtonMPComponent,
    CheckboxMPComponent,
    InputMpComponent,
    HtmlMpComponent
  ],
  exports: [
    SimplemattableModule,
    ClipboardModule
  ], entryComponents:
    [
      ButtonMPComponent,
      CheckboxMPComponent,
      InputMpComponent,
      HtmlMpComponent
    ]
})
export class GenericTableModule { }
