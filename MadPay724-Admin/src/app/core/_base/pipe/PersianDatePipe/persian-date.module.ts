import { NgModule } from '@angular/core';
import { PersianDate } from './persian-date.pipe';
import { PersianCalendarService } from './persian-date.service';


@NgModule({
    declarations: [PersianDate],
    exports: [PersianDate],
    providers: [PersianCalendarService]
})

export class PersianDateModule { }