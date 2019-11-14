
import { Injectable, Pipe } from '@angular/core';
import { PersianCalendarService } from './persian-date.service';

/*
  Generated class for the PersianDate pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
// tslint:disable-next-line: use-pipe-transform-interface
@Pipe({
    name: 'persianDate'
})
@Injectable()
export class PersianDate {
    /**
     *
     */
    constructor(public persianCalendarService: PersianCalendarService) {

    }
    /*
      Takes a value and convert it to
     */
    transform(value: string) {
        const d = new Date(value);
        return this.persianCalendarService.PersianCalendar(d);
    }
}
