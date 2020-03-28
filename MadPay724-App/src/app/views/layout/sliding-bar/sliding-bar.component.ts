import { Component, OnInit, OnDestroy } from '@angular/core';
import { LayoutService } from 'src/app/core/_services/layout/layout.service';
import { BlogDirectory } from 'src/app/data/models/blog/blogDirectory';
import { Subscription, Observable } from 'rxjs';
import { ApiReturn } from 'src/app/data/models/common/apiReturn';
import { PersianCalendarService } from 'src/app/core/_base/pipe/PersianDatePipe/persian-date.service';

@Component({
  selector: 'app-sliding-bar',
  templateUrl: './sliding-bar.component.html',
  styleUrls: ['./sliding-bar.component.css']
})
export class SlidingBarComponent implements OnInit, OnDestroy {
  subManager = new Subscription();
  sidbarData: ApiReturn<BlogDirectory>;

  dateTime1: Date = new Date();
  dateTime2: Date = new Date();
  dateTime3: Date = new Date();
  dateTime4: Date = new Date();
  dateTime5: Date = new Date();
  constructor(private persianCalendarService: PersianCalendarService,private layoutService: LayoutService) {
    this.dateTime1.setMonth(this.dateTime1.getMonth());
    this.dateTime2.setMonth(this.dateTime1.getMonth() - 1);
    this.dateTime3.setMonth(this.dateTime2.getMonth() - 1);
    this.dateTime4.setMonth(this.dateTime3.getMonth() - 1);
    this.dateTime5.setMonth(this.dateTime4.getMonth() - 1);
  }
  ngOnInit() {
    this.loadSidbarData();
  }
 async loadSidbarData() {
    this.sidbarData = await this.layoutService.getSidbarData().toPromise();
  }
  toYearMonthDate(dt: Date, isYear: boolean): string {
    if (isYear) {
      return dt.getFullYear().toString();
    } else {
      let month = dt.getMonth() + 1;
      let monthstr = month.toString();
      switch (month) {
        case 1:
          monthstr = '01';
          break;
        case 2:
          monthstr = '02';
          break;
        case 3:
          monthstr = '03';
          break;
        case 4:
          monthstr = '04';
          break;
        case 5:
          monthstr = '05';
          break;
        case 6:
          monthstr = '06';
          break;
        case 7:
          monthstr = '07';
          break;
        case 8:
          monthstr = '08';
          break;
        case 9:
          monthstr = '09';
          break;
      }
      return monthstr;
    }

  }
  toPersianDate(dt: Date): string {
    return this.persianCalendarService.PersianCalendarMonthYear(dt);
  }
  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
}
