import { NgModule } from '@angular/core';
import { SimplemattableModule } from 'simplemattable';
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  imports: [
    SimplemattableModule,
    ClipboardModule
  ],
  exports: [
    SimplemattableModule,
    ClipboardModule
  ]
})
export class GenericTableModule { }
