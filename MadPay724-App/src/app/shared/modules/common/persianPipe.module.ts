import { NgModule, Pipe } from '@angular/core';
import { IRCurrencyPipe, JdatePipe } from 'ngx-persian';
import { PersianTimeAgoPipe } from 'persian-time-ago-pipe';
import { PersianDate } from 'src/app/core/_base/pipe/PersianDatePipe/persian-date.pipe';
import { PersianCalendarService } from 'src/app/core/_base/pipe/PersianDatePipe/persian-date.service';


@Pipe({
  name: 'persianTimeAgo',
  pure: false
})
export class ExPersianTimeAgoPipe extends PersianTimeAgoPipe { };
//
@Pipe({
  name: 'irc',
  pure: false
})
export class ExIRCurrencyPipe extends IRCurrencyPipe { };
//
@Pipe({
  name: 'jdate',
  pure: false
})
export class ExJdatePipe extends JdatePipe { };


@NgModule({
  declarations: [
    PersianDate,
    ExPersianTimeAgoPipe,
    ExIRCurrencyPipe,
    ExJdatePipe
  ],
  providers: [
    PersianCalendarService
  ],
  exports: [
    PersianDate,
    ExPersianTimeAgoPipe,
    ExIRCurrencyPipe,
    ExJdatePipe
  ]
  
})
export class PersianPipeModule { }
