import { Component, OnInit, OnDestroy, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { Subscription, Observable, fromEvent, of } from 'rxjs';
import { Pagination } from 'src/app/data/models/common/pagination';
import { Gate } from 'src/app/data/models/user/gate';
import { FilterSortOrderBy } from 'src/app/data/models/common/filterSortOrderBy';
import { TableColumn, Width } from 'simplemattable';
import { InputMpComponent } from 'src/app/shared/component/input-mp/input-mp.component';
import { ButtonMPComponent } from 'src/app/shared/component/button-mp/button-mp.component';
import { UiType } from 'src/app/data/enums/uiType.enum';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { debounceTime, map, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Sort } from '@angular/material';
import { CheckboxMPComponent } from 'src/app/shared/component/checkbox-mp/checkbox-mp.component';
import { HtmlMpComponent } from 'src/app/shared/component/html-mp/html-mp.component';

import * as fromStore from '../../../../../../../store';
import { GateAccService } from 'src/app/core/_services/panel/accountant/gateAccService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gates',
  templateUrl: './gates.component.html',
  styleUrls: ['./gates.component.css']
})
export class GatesComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('searchKey', { static: false }) filter: ElementRef;
  subManager = new Subscription();
  gates: Gate[];
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
      .withWidth(Width.px(40))
      .withNgComponent(HtmlMpComponent)
      .withNgComponentInput((component: HtmlMpComponent, iconUrl) => {
        component.isImage = true;
        component.text = iconUrl;
        component.class = 'img-icon';
      }),
    new TableColumn<Gate, 'id'>('شناسه', 'id')
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
   
    new TableColumn<Gate, 'isActive'>('وضعیت', 'isActive')
      .withNgComponent(CheckboxMPComponent)
      .withNgComponentInput((component: CheckboxMPComponent, isActive, gate) => {
        component.event = (data) => {
          this.onStatusChange(1,data, gate.id);
        };
        component.checked = isActive;
        component.disabled = false;
        component.type = UiType.Success;
      }),
    new TableColumn<Gate, 'isDirect'>('وضعیت', 'isDirect')
      .withNgComponent(CheckboxMPComponent)
      .withNgComponentInput((component: CheckboxMPComponent, isDirect, gate) => {
        component.event = (data) => {
          this.onStatusChange(2,data, gate.id);
        };
        component.checked = isDirect;
        component.disabled = false;
        component.type = UiType.Info;
      }),
    new TableColumn<Gate, 'isIp'>('وضعیت', 'isIp')
      .withNgComponent(CheckboxMPComponent)
      .withNgComponentInput((component: CheckboxMPComponent, isIp, gate) => {
        component.event = (data) => {
          this.onStatusChange(3,data, gate.id);
        };
        component.checked = isIp;
        component.disabled = false;
        component.type = UiType.Error;
      }),
    new TableColumn<Gate, 'ip'>('آی پی', 'ip')
      .withWidth(Width.px(10))
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
      .withWidth(Width.px(10))
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
      .withWidth(Width.px(30))
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
      .withNgComponentInput((component: ButtonMPComponent, id, gate) => {
        component.event = () => this.onGateFactorsClick(gate);
        component.icon = "icon-bag";
        component.text = " فاکتور ها";
        component.type = UiType.Success;
      })
  ];
  constructor(private alertService: ToastrService
    , private gateService: GateAccService, private store: Store<fromStore.State>,
    private router: Router, private loc: Location) { }


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
  onPageChange(offset: number, limit: number, filter?: string): Observable<Gate[]> {

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
      this.subManager.add(
        this.gateService.getAccGates(offset, limit,
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
                this.alertService.success('وضعیت فاکتور تایید شد', 'موفق');
              } else {
                this.alertService.success('وضعیت فاکتور از حالت تایید خارج شد', 'موفق');
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
                this.alertService.success('وضعیت فاکتور تایید شد', 'موفق');
              } else {
                this.alertService.success('وضعیت فاکتور از حالت تایید خارج شد', 'موفق');
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
                this.alertService.success('وضعیت فاکتور تایید شد', 'موفق');
              } else {
                this.alertService.success('وضعیت فاکتور از حالت تایید خارج شد', 'موفق');
              }
            }, error => {
              this.alertService.error(error);
            })
        )  
    }
   
  }
  onGateFactorsClick(gate: Gate) {
    this.store.dispatch(new fromStore.EditCurrentTitle(
      { id: gate.id, title: gate.websiteName }));
    this.router.navigate(['/panel/accountant/gates', gate.id, 'factors']);
  }
  onBack() {
    this.loc.back();
  }
  
}
