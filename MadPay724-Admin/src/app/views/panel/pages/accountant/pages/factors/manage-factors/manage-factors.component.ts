import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Subscription, Observable, fromEvent, Subject } from 'rxjs';
import { Factor } from 'src/app/data/models/accountant/factor';
import { Pagination } from 'src/app/data/models/common/pagination';
import { FilterSortOrderBy } from 'src/app/data/models/common/filterSortOrderBy';
import { TableColumn, Width } from 'simplemattable';
import { InputMpComponent } from 'src/app/shared/component/input-mp/input-mp.component';
import { UiType } from 'src/app/data/enums/uiType.enum';
import { CheckboxMPComponent } from 'src/app/shared/component/checkbox-mp/checkbox-mp.component';
import { ButtonMPComponent } from 'src/app/shared/component/button-mp/button-mp.component';
import { CurrentTitleStateModel } from '../../../store/_models/currentTitleStateModel';
import { ActivatedRoute, Router } from '@angular/router';
import { FactorService } from 'src/app/core/_services/panel/accountant/factor.service';
import { ToastrService } from 'ngx-toastr';
import { AccountantStateModel } from '../../../store/_models/accountantStateModel';
import { Store } from '@ngrx/store';
import { IRCurrencyPipe } from 'ngx-persian';
import { debounceTime, map, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Location, DatePipe } from '@angular/common';

import { Sort } from '@angular/material';
import { PersianCalendarService } from 'src/app/core/_base/pipe/PersianDatePipe/persian-date.service';
import { Options, LabelType } from 'ng5-slider';


@Component({
  selector: 'app-manage-factors',
  templateUrl: './manage-factors.component.html',
  styleUrls: ['./manage-factors.component.css']
})
export class ManageFactorsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('searchKey', { static: false }) filter: ElementRef;
  subManager = new Subscription();
  factors: Factor[];
  pagination: Pagination = {
    currentPage: 0,
    itemsPerPage: 5,
    totalItems: 0,
    totalPages: 0
  };
  filterSortOrderBy: FilterSortOrderBy = {
    sortDirection: '',
    sortHeader: '',
    searchKey: ''
  };
  minPrice: number = 500000;
  maxPrice: number = 5000000;
  options: Options = {
    floor: 0,
    ceil: 10000000,
    step:10000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>حداقل:</b> ' + this.irCurrencyPipe.transform(value).replace("ریال", "تومان");
        case LabelType.High:
          return '<b>حداکثر:</b> ' + this.irCurrencyPipe.transform(value).replace("ریال", "تومان");
        default:
          return this.irCurrencyPipe.transform(value).replace("ریال", "");
      }
    }
  };
  dateRange: Date[] = this.createDateRange();
  minDate: number = this.dateRange[100].getTime();
  maxDate: number = this.dateRange[450].getTime();
  optionsDate: Options = {
    stepsArray: this.dateRange.map((date: Date) => {
      return { value: date.getTime() };
    }),
    translate: (value: number, label: LabelType): string => {
      var valDt = new Date(value);
      switch (label) {
        case LabelType.Low:
          return '<b>حداقل:</b> ' + this.persianCalendarService.PersianCalendarSmall(valDt);
        case LabelType.High:
          return '<b>حداکثر:</b> ' + this.persianCalendarService.PersianCalendarSmall(valDt) ;
        default:
          return this.persianCalendarService.PersianCalendarSmall(valDt);
      }
    }
  };
  columns = [
    new TableColumn<Factor, 'id'>('شناسه', 'id')
      .withWidth(Width.px(50))
      .withNgComponent(InputMpComponent)
      .withNgComponentInput((component: InputMpComponent, id) => {
        component.event = () => { };
        component.disabled = false;
        component.iconColor = UiType.InputInfo;
        component.text = id;
        component.isForCopy = true;
        component.icon = "ft-copy";
      }),

   
    new TableColumn<Factor, 'kind'>('نوع', 'kind'),
    new TableColumn<Factor, 'status'>('وضعیت', 'status')
      .withNgComponent(CheckboxMPComponent)
      .withNgComponentInput((component: CheckboxMPComponent, status, factor) => {
        component.event = (data) => {
          this.onStatusChange(data, factor.id);
        };
        component.checked = status;
        component.disabled = false;
        component.type = UiType.Info;
      }),
    new TableColumn<Factor, 'bank'>('بانک', 'bank'),
    new TableColumn<Factor, 'dateCreated'>('تاریخ ایجاد', 'dateCreated')
      .withNgStyle(() => ({ 'font-size': '14px', 'color': '#ff4081' }))
      .withTransform((data) =>
        this.persianCalendarService.PersianCalendar(data)
        + ' ( ' +
        this.datePipe.transform(data, 'HH:mm')
        + ' )'
      ),

    new TableColumn<Factor, 'price'>('مبلغ اصلی', 'price')
      .withTransform((data) => this.irCurrencyPipe.transform(data).replace("ریال", "تومان")),
    new TableColumn<Factor, 'endPrice'>('مبلغ نهایی', 'endPrice')
      .withTransform((data) => this.irCurrencyPipe.transform(data).replace("ریال", "تومان"))
      .withNgStyle(() => ({'font-weight': '900' })),
    
    new TableColumn<Factor, 'id'>('عملیات', 'id')
      .withNgComponent(ButtonMPComponent)
      .withNgComponentInput((component: ButtonMPComponent, id) => {
        component.event = () => { this.router.navigate(['/panel/accountant/factors', id,'detail']) };
        component.icon = "ft-alert-octagon";
        component.text = " جزییات و ویرایش";
        component.type = UiType.Success;
      })
  ];

  constructor(private route: ActivatedRoute, private alertService: ToastrService
    , private factorService: FactorService, private store: Store<AccountantStateModel>,
    private router: Router, private irCurrencyPipe: IRCurrencyPipe, private loc: Location,
    private persianCalendarService: PersianCalendarService, private datePipe: DatePipe) { }

  createDateRange(): Date[] {
    var currentDate = new Date().getFullYear();
    const dates: Date[] = [];
    for (let i: number = 1; i <= 12; i++) {
      for (let j: number = 1; j <= 31; j++) {
        dates.push(new Date(currentDate-1, i, j));
      }
    }
    for (let i: number = 1; i <= 12; i++) {
      for (let j: number = 1; j <= 31; j++) {
        dates.push(new Date(currentDate, i, j));
      }
    }
    
    return dates;
  }
  ngOnInit() {
  }
  ngAfterViewInit() {
    this.subManager.add(
      fromEvent(this.filter.nativeElement, 'keyup')
        .pipe(
          debounceTime(1000),
          map((event: Event) => (<HTMLInputElement>event.target).value),
          distinctUntilChanged(),
          switchMap(value => this.onPageChange(this.pagination.currentPage, this.pagination.itemsPerPage, value)),
        ).subscribe()
    );
  }
  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
  sortEvent(data: Sort) {
    this.filterSortOrderBy.sortHeader = data.active.split('_')[1];
    this.filterSortOrderBy.sortDirection = data.direction;
    this.onPageChange(this.pagination.currentPage, this.pagination.itemsPerPage);
  }
  onSearchClear() {
    this.onPageChange(this.pagination.currentPage, this.pagination.itemsPerPage);
  }
  onPageChange(offset: number, limit: number, filter?: string): Observable<Factor[]> {

    let { sortDirection, sortHeader } = this.filterSortOrderBy;
    if (filter === undefined || filter == null) {
      filter = '';
    }
    if (sortDirection === undefined || sortDirection == null) {
      sortDirection = '';
    }
    if (sortHeader === undefined || sortHeader == null) {
      sortHeader = '';
    }
    this.filterSortOrderBy.searchKey = filter;
    //offset : page index
    //limit : page size
    const observable = new Subject<Factor[]>();
    setTimeout(() => {
      this.subManager.add(
        this.factorService.getFactors(offset, limit,
          filter.trim(), sortHeader, sortDirection)
          .subscribe((data) => {
            this.factors = data.result;
            this.pagination = data.pagination;
          }, error => {
            this.alertService.error(error);
          })
      );
      observable.next(this.factors);
    }, 0);

    return observable;
  }
  onStatusChange(event: any, factorId: string) {
    this.subManager.add(
      this.factorService.changeStatusFactor(factorId, event.checked)
        .subscribe(() => {
          this.onPageChange(this.pagination.currentPage, this.pagination.itemsPerPage);
          if (event.checked === true) {
            this.alertService.success('وضعیت فاکتور تایید شد', 'موفق');
          } else {
            this.alertService.success('وضعیت فاکتور از حالت تایید خارج شد', 'موفق');
          }
        }, error => {
          this.alertService.error(error);
        })
    )
  }
  onBack() {
    this.loc.back();
  }
}
