import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Subscription, Observable, fromEvent, Subject } from 'rxjs';
import { Factor } from 'src/app/data/models/accountant/factor';
import { Pagination } from 'src/app/data/models/common/pagination';
import { FilterSortOrderBy } from 'src/app/data/models/common/filterSortOrderBy';
import { TableColumn, Width } from 'simplemattable';
import { InputMpComponent } from 'src/app/shared/component/input-mp/input-mp.component';
import { CheckboxMPComponent } from 'src/app/shared/component/checkbox-mp/checkbox-mp.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FactorService } from 'src/app/core/_services/panel/accountant/factor.service';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { IRCurrencyPipe } from 'ngx-persian';
import { DatePipe, Location } from '@angular/common';
import { PersianCalendarService } from 'src/app/core/_base/pipe/PersianDatePipe/persian-date.service';
import { debounceTime, map, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Sort } from '@angular/material';
import { ButtonMPComponent } from 'src/app/shared/component/button-mp/button-mp.component';
import { UiType } from 'src/app/data/enums/uiType.enum';

import * as fromStore from '../../../../../../../../../store';
import { CurrentTitleStateModel } from 'src/app/store/_model/currentTitleStateModel';


@Component({
  selector: 'app-wallets-factors',
  templateUrl: './wallets-factors.component.html',
  styleUrls: ['./wallets-factors.component.css']
})
export class WalletsFactorsComponent implements OnInit, OnDestroy, AfterViewInit {
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
      .withNgStyle(() => ({ 'font-weight': '900' })),

    new TableColumn<Factor, 'id'>('عملیات', 'id')
      .withNgComponent(ButtonMPComponent)
      .withNgComponentInput((component: ButtonMPComponent, id) => {
        component.event = () => { this.router.navigate(['/panel/accountant/factors', id, 'detail']) };
        component.icon = "ft-alert-octagon";
        component.text = " جزییات و ویرایش";
        component.type = UiType.Success;
      })
  ];

  walletInfo$: Observable<CurrentTitleStateModel>

  constructor(private route: ActivatedRoute, private alertService: ToastrService
    , private factorService: FactorService, private store: Store<fromStore.State>,
    private router: Router, private irCurrencyPipe: IRCurrencyPipe, private loc: Location,
    private persianCalendarService: PersianCalendarService, private datePipe: DatePipe) { }


  ngOnInit() {
    this.walletInfo$ = this.store.select(fromStore.getCurrentTitle);
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
    let walletId = ''
    this.subManager.add(
      this.route.params.subscribe(params => {
        walletId = params['walletId'];
      })
    );
    const observable = new Subject<Factor[]>();
    setTimeout(() => {
      this.subManager.add(
        this.factorService.getWalletFactors(walletId,offset, limit,
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
