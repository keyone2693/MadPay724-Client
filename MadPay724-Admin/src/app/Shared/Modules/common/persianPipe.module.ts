import { NgModule } from '@angular/core';
import { IRCurrencyPipe, JdatePipe } from 'ngx-persian';
import { PersianTimeAgoPipe } from 'persian-time-ago-pipe';

@NgModule({
  declarations: [PersianTimeAgoPipe,
    IRCurrencyPipe,
    JdatePipe,],
  exports: [PersianTimeAgoPipe,
    IRCurrencyPipe,
    JdatePipe,],
})
export class PersianPipeModule { }
