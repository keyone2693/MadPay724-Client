import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Subscription, fromEvent, of, Observable } from 'rxjs';
import { Gate } from 'src/app/data/models/user/gate';
import { Pagination } from 'src/app/data/models/common/pagination';
import { FilterSortOrderBy } from 'src/app/data/models/common/filterSortOrderBy';
import {  TableColumn } from 'simplemattable';
import { HtmlMpComponent } from 'src/app/shared/component/html-mp/html-mp.component';
import { InputMpComponent } from 'src/app/shared/component/input-mp/input-mp.component';
import { UiType } from 'src/app/data/enums/uiType.enum';
import { CheckboxMPComponent } from 'src/app/shared/component/checkbox-mp/checkbox-mp.component';
import { ButtonMPComponent } from 'src/app/shared/component/button-mp/button-mp.component';
import { ToastrService } from 'ngx-toastr';
import { GateAccService } from 'src/app/core/_services/panel/accountant/gateAccService.service';
import { AccountantStateModel } from '../../../../../store/_models/accountantStateModel';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Sort } from '@angular/material';
import { CurrentTitleStateModel } from '../../../../../store/_models/currentTitleStateModel';

import * as fromAccountantStore from '../../../../../store';


@Component({
  selector: 'app-wallets-gates',
  templateUrl: './wallets-gates.component.html',
  styleUrls: ['./wallets-gates.component.css']
})
export class WalletsGatesComponent implements  OnInit , OnDestroy, AfterViewInit {
  @ViewChild('searchKey', { static: false }) filter: ElementRef;
  subManager = new Subscription();
  gates: Gate[];
  walletInfo$: Observable<CurrentTitleStateModel>
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
    new TableColumn<Gate, 'iconUrl'>('ایکن', 'iconUrl')
      .withNgComponent(HtmlMpComponent)
      .withNgComponentInput((component: HtmlMpComponent, iconUrl) => {
        component.isImage = true;
        component.text = iconUrl;
        component.class = 'img-icon';
      }),
    new TableColumn<Gate, 'id'>('شناسه', 'id')
      .withNgComponent(InputMpComponent)
      .withNgComponentInput((component: InputMpComponent, id) => {
        component.event = () => { };
        component.disabled = false;
        component.iconColor = UiType.InputInfo;
        component.text = id;
        component.isForCopy = true;
        component.icon = "ft-copy";
      }),

    new TableColumn<Gate, 'isActive'>('وضعیت', 'isActive')
      .withNgComponent(CheckboxMPComponent)
      .withNgComponentInput((component: CheckboxMPComponent, isActive, gate) => {
        component.event = (data) => {
          this.onStatusChange(1, data, gate.id);
        };
        component.checked = isActive;
        component.disabled = false;
        component.type = UiType.Success;
      }),
    new TableColumn<Gate, 'isDirect'>('وضعیت', 'isDirect')
      .withNgComponent(CheckboxMPComponent)
      .withNgComponentInput((component: CheckboxMPComponent, isDirect, gate) => {
        component.event = (data) => {
          this.onStatusChange(2, data, gate.id);
        };
        component.checked = isDirect;
        component.disabled = false;
        component.type = UiType.Info;
      }),
    new TableColumn<Gate, 'isIp'>('وضعیت', 'isIp')
      .withNgComponent(CheckboxMPComponent)
      .withNgComponentInput((component: CheckboxMPComponent, isIp, gate) => {
        component.event = (data) => {
          this.onStatusChange(3, data, gate.id);
        };
        component.checked = isIp;
        component.disabled = false;
        component.type = UiType.Error;
      }),
    new TableColumn<Gate, 'ip'>('آی پی', 'ip')
      .withNgComponent(InputMpComponent)
      .withNgComponentInput((component: InputMpComponent, ip) => {
        component.event = () => { };
        component.disabled = false;
        component.iconColor = UiType.InputSuccess;
        component.text = ip;
        component.isForCopy = true;
        component.icon = "ft-copy";
      }),
    new TableColumn<Gate, 'grouping'>('دسته بندی', 'grouping'),
    new TableColumn<Gate, 'websiteName'>('نام وبسایت', 'websiteName'),
    new TableColumn<Gate, 'phoneNumber'>('موبایل', 'phoneNumber'),
    new TableColumn<Gate, 'websiteUrl'>('آدرس', 'websiteUrl')
      .withNgComponent(InputMpComponent)
      .withNgComponentInput((component: InputMpComponent, websiteUrl) => {
        component.event = () => { };
        component.disabled = false;
        component.iconColor = UiType.InputSuccess;
        component.text = websiteUrl;
        component.isForCopy = true;
        component.icon = "ft-copy";
      }),
    new TableColumn<Gate, 'text'>('متن', 'text')
      .withNgComponent(HtmlMpComponent)
      .withNgComponentInput((component: HtmlMpComponent, text) => {
        component.text = text.substring(0, 10) + '...';
        component.isTooltip = true;
        component.tooltipText = text;
        component.tooltipPosition = 'below';
        component.class = 'txtwxp';
      }),
    new TableColumn<Gate, 'id'>('عملیات', 'id')
      .withNgComponent(ButtonMPComponent)
      .withNgComponentInput((component: ButtonMPComponent, id,gate) => {
        component.event = () => this.onGateFactorsClick(gate);
        component.icon = "icon-bag";
        component.text = " فاکتور ها";
        component.type = UiType.Success;
      })
  ];
  constructor(private route: ActivatedRoute,private alertService: ToastrService
    , private gateService: GateAccService, private store: Store<AccountantStateModel>,
    private router: Router, private loc: Location) { }


  ngOnInit() {
    this.walletInfo$ = this.store.select(fromAccountantStore.getCurrentTitle);
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
  onPageChange(offset: number, limit: number, filter ?: string): Observable<Gate[]> {
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
    
  this.subManager.add(
    this.gateService.getWalletGates(walletId,offset, limit,
      filter.trim(), sortHeader, sortDirection)
      .subscribe((data) => {
        this.gates = data.result;
        this.pagination = data.pagination;
      }, error => {
        this.alertService.error(error);
      })
  );

  return of(this.gates);
}
onStatusChange(type: number, event: any, gateId: string) {
  switch (type) {
    case 1:
      this.subManager.add(
        this.gateService.changeActiveGate(gateId, event.checked)
          .subscribe(() => {
            this.onPageChange(this.pagination.currentPage, this.pagination.itemsPerPage);
            if (event.checked === true) {
              this.alertService.success('وضعیت درگاه فعال شد', 'موفق');
            } else {
              this.alertService.success(' درگاه از حالت فعالی خارج شد', 'موفق');
            }
          }, error => {
            this.alertService.error(error);
          })
      )
    case 2:
      this.subManager.add(
        this.gateService.changeDirectGate(gateId, event.checked)
          .subscribe(() => {
            this.onPageChange(this.pagination.currentPage, this.pagination.itemsPerPage);
            if (event.checked === true) {
              this.alertService.success(' درگاه مستقیم شد', 'موفق');
            } else {
              this.alertService.success('درگاه از حالت مستقیم خارج شد', 'موفق');
            }
          }, error => {
            this.alertService.error(error);
          })
      )
    case 3:
      this.subManager.add(
        this.gateService.changeIpGate(gateId, event.checked)
          .subscribe(() => {
            this.onPageChange(this.pagination.currentPage, this.pagination.itemsPerPage);
            if (event.checked === true) {
              this.alertService.success('درگاه محدودیت آی پی پیدا کرد ', 'موفق');
            } else {
              this.alertService.success(' درگاه از محدودیت آی پی خارج شد', 'موفق');
            }
          }, error => {
            this.alertService.error(error);
          })
      )
  }

}
  onGateFactorsClick(gate: Gate) {
    this.store.dispatch(new fromAccountantStore.EditCurrentTitle(
      { id: gate.id, title: gate.websiteName }));
    this.router.navigate(['/panel/accountant/gates', gate.id, 'factors']);
  }
onBack() {
  this.loc.back();
}

}
