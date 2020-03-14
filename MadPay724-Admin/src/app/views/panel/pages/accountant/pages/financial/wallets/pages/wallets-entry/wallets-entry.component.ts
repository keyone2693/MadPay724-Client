import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';
import { Subscription, Observable, Subject, fromEvent } from 'rxjs';
import { Entry } from 'src/app/data/models/accountant/entry';
import { Pagination } from 'src/app/data/models/common/pagination';
import { FilterSortOrderBy } from 'src/app/data/models/common/filterSortOrderBy';
import { TableColumn, Width } from 'simplemattable';
import { InputMpComponent } from 'src/app/shared/component/input-mp/input-mp.component';
import { UiType } from 'src/app/data/enums/uiType.enum';
import { CheckboxMPComponent } from 'src/app/shared/component/checkbox-mp/checkbox-mp.component';
import { HtmlMpComponent } from 'src/app/shared/component/html-mp/html-mp.component';
import { ButtonMPComponent } from 'src/app/shared/component/button-mp/button-mp.component';
import { TooltipPosition } from 'src/app/data/enums/tooltipPosition.enum';
import { EntryService } from 'src/app/core/_services/panel/accountant/entry.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { IRCurrencyPipe } from 'ngx-persian';


import * as fromStore from '../../../../../../../../../store';
import { map, distinctUntilChanged, switchMap, debounceTime } from 'rxjs/operators';
import { Sort } from '@angular/material/sort';
import { Location } from '@angular/common';
import { CurrentTitleStateModel } from 'src/app/store/_model/currentTitleStateModel';


@Component({
  selector: 'app-wallets-entry',
  templateUrl: './wallets-entry.component.html',
  styleUrls: ['./wallets-entry.component.css']
})
export class WalletsEntryComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('searchKey', { static: false }) filter: ElementRef;
  subManager = new Subscription();
  walletEntries: Entry[];
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
    new TableColumn<Entry, 'id'>('شناسه', 'id')
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
    new TableColumn<Entry, 'ownerName'>('صاحب حساب', 'ownerName'),
    // .withTransform((data) =>
    //   this.PersianCalendarService.PersianCalendar(data)
    //   + ' ' +
    //   this.DatePipe.transform(data, 'HH:mm')),
    new TableColumn<Entry, 'isApprove'>('تاییدی', 'isApprove')
      .withNgComponent(CheckboxMPComponent)
      .withNgComponentInput((component: CheckboxMPComponent, isApprove, entry) => {
        component.event = (data) => {
          this.onApproveChange(data, entry.id);
        };
        component.checked = isApprove;
        component.disabled = entry.isReject || entry.isPardakht;
        component.type = UiType.Info;
      }),
    new TableColumn<Entry, 'isPardakht'>('پرداختی', 'isPardakht')
      .withNgComponent(CheckboxMPComponent)
      .withNgComponentInput((component: CheckboxMPComponent, isPardakht, entry) => {
        component.event = (data) => {
          this.onPardakhtChange(data, entry.id);

        };
        component.checked = isPardakht;
        component.disabled = !entry.isApprove || entry.isReject;
        component.type = UiType.Success;
      }),
    new TableColumn<Entry, 'isReject'>('ردی', 'isReject')
      .withNgComponent(CheckboxMPComponent)
      .withNgComponentInput((component: CheckboxMPComponent, isReject, entry) => {
        component.event = (data) => {
          this.onRejectChange(data, entry.id);
        };
        component.checked = isReject;
        component.disabled = entry.isPardakht;
        component.type = UiType.Error;
      }),
    new TableColumn<Entry, 'price'>('مبلغ', 'price')
      .withTransform((data) => this.irCurrencyPipe.transform(data).replace("ریال", "تومان")),
    new TableColumn<Entry, 'textForUser'>('متن پاسخ', 'textForUser')
      .withNgComponent(HtmlMpComponent)
      .withNgComponentInput((component: HtmlMpComponent, textForUser) => {
        component.isTooltip = true;
        component.tooltipText = textForUser;
        component.tooltipPosition = TooltipPosition.Below;
        component.class = 'txtwxp';
        component.text = textForUser.substring(0, 10) + ' ...'
      }),
    new TableColumn<Entry, 'id'>('عملیات', 'id')
      .withNgComponent(ButtonMPComponent)
      .withNgComponentInput((component: ButtonMPComponent, id) => {
        component.event = () => { this.router.navigate(['/panel/accountant/entryedit/', id]) };
        component.icon = "ft-alert-octagon";
        component.text = " جزییات و ویرایش";
        component.type = UiType.Success;
      })
  ];

  walletInfo$: Observable<CurrentTitleStateModel>

  constructor(private route: ActivatedRoute, private alertService: ToastrService
    , private entryService: EntryService, private store: Store<fromStore.State>,
    private router: Router, private irCurrencyPipe: IRCurrencyPipe, private loc: Location) { }


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
  onPageChange(offset: number, limit: number, filter?: string): Observable<Entry[]> {

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
    const observable = new Subject<Entry[]>();
    setTimeout(() => {
      this.subManager.add(
        this.entryService.getWalletEntries(walletId,
          offset, limit,
          filter.trim(), sortHeader, sortDirection)
          .subscribe((data) => {
            this.walletEntries = data.result;
            this.pagination = data.pagination;
          }, error => {
            this.alertService.error(error);
          })
      );
      observable.next(this.walletEntries);
    }, 0);

    return observable;
  }
  onApproveChange(event: any, entryId: string) {
    this.subManager.add(
      this.entryService.changeApproveEntry(entryId, event.checked)
        .subscribe(() => {
          this.onPageChange(this.pagination.currentPage, this.pagination.itemsPerPage);
          if (event.checked === true) {
            this.alertService.success('واریزی تایید شد', 'موفق');
          } else {
            this.alertService.success('واریزی از حالت تایید خارج شد', 'موفق');
          }
        }, error => {
          this.alertService.error(error);
        })
    )
  }
  onPardakhtChange(event: any, entryId: string) {
    this.subManager.add(
      this.entryService.changePardakhtEntry(entryId, event.checked)
        .subscribe(() => {
          this.onPageChange(this.pagination.currentPage, this.pagination.itemsPerPage);
          if (event.checked === true) {
            this.alertService.success('واریزی پرداخت شد', 'موفق');
          } else {
            this.alertService.success('واریزی از حالت پرداخت خارج شد', 'موفق');
          }
        }, error => {
          this.alertService.error(error);
        })
    )
  }
  onRejectChange(event: any, entryId: string) {
    this.subManager.add(
      this.entryService.changeRejectEntry(entryId, event.checked)
        .subscribe(() => {
          this.onPageChange(this.pagination.currentPage, this.pagination.itemsPerPage);
          if (event.checked === true) {
            this.alertService.success('واریزی رد شد', 'موفق');
          } else {
            this.alertService.success('واریزی از حالت رد خارج شد', 'موفق');
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
