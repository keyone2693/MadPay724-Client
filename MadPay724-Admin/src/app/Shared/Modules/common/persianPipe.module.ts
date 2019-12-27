import { NgModule } from '@angular/core';
import { IRCurrencyPipe, JdatePipe } from 'ngx-persian';
import { PersianTimeAgoPipe } from 'persian-time-ago-pipe';
import { PersianDate } from 'src/app/core/_base/pipe/PersianDatePipe/persian-date.pipe';
import { PersianCalendarService } from 'src/app/core/_base/pipe/PersianDatePipe/persian-date.service';

@NgModule({
  declarations: [
    PersianDate,
    PersianTimeAgoPipe,
    IRCurrencyPipe,
    JdatePipe
  ],
  providers: [
    PersianTimeAgoPipe,
    IRCurrencyPipe,
    JdatePipe,
    //PersianDate,
    PersianCalendarService
  ],
  exports: [
    PersianTimeAgoPipe,
    IRCurrencyPipe,
    JdatePipe,
    PersianDate
  ]
  
})
export class PersianPipeModule { }
