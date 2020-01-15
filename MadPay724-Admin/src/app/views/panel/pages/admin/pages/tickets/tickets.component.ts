import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable, of } from 'rxjs';
import { Ticket } from 'src/app/data/models/ticket';
import { Pagination } from 'src/app/data/models/common/pagination';
import { Options, LabelType } from 'ng5-slider';
import { TableColumn } from 'simplemattable';
import { InputMpComponent } from 'src/app/shared/component/input-mp/input-mp.component';
import { UiType } from 'src/app/data/enums/uiType.enum';
import { CheckboxMPComponent } from 'src/app/shared/component/checkbox-mp/checkbox-mp.component';
import { ButtonMPComponent } from 'src/app/shared/component/button-mp/button-mp.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PersianCalendarService } from 'src/app/core/_base/pipe/PersianDatePipe/persian-date.service';
import { DatePipe } from '@angular/common';
import { Sort } from '@angular/material';
import { FilterSortOrderBy } from 'src/app/data/models/common/filterSortOrderBy';
import { TicketSearch } from 'src/app/data/models/admin/ticketSearch';
import { TicketsService } from 'src/app/core/_services/panel/admin/tickets.service';
import 'src/app/shared/extentions/bool.extentions'
import 'src/app/shared/extentions/number.extentions'
import { HtmlMpComponent } from 'src/app/shared/component/html-mp/html-mp.component';
import { Store } from '@ngrx/store';

import * as fromStore from 'src/app/store';


@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit, OnDestroy {
  dateRange: Date[] = this.createDateRange();
  search: TicketSearch = {
    closed: 0,
    level: 0,
    department: 0,
    minDate: this.dateRange[0].getTime(),
    maxDate: this.dateRange[729].getTime(),
    isAdminSide: 0,
    filter: ''
  }
  subManager = new Subscription();
  tickets: Ticket[];
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
          return '<b>حداکثر:</b> ' + this.persianCalendarService.PersianCalendarSmall(valDt);
        default:
          return this.persianCalendarService.PersianCalendarSmall(valDt);
      }
    }
  };
  columns = [
    new TableColumn<Ticket, 'id'>('شناسه', 'id')
      .withNgComponent(InputMpComponent)
      .withNgComponentInput((component: InputMpComponent, id) => {
        component.event = () => { };
        component.disabled = false;
        component.iconColor = UiType.InputInfo;
        component.text = id;
        component.isForCopy = true;
        component.icon = "ft-copy";
      }),


    new TableColumn<Ticket, 'title'>('تایتل', 'title'),

    new TableColumn<Ticket, 'closed'>('وضعیت', 'closed')
      .withNgComponent(CheckboxMPComponent)
      .withNgComponentInput((component: CheckboxMPComponent, closed, ticket) => {
        component.event = (data) => {
          this.onCloseChange(ticket.id,data);
        };
        component.checked = closed;
        component.disabled = false;
        component.type = UiType.Error;
      }),
    
    new TableColumn<Ticket, 'level'>('اولویت', 'level')
      .withNgComponent(HtmlMpComponent)
      .withNgComponentInput((component: HtmlMpComponent, level, ticket) => {
        component.isBadge = true  ;
        component.text = level.toTicketLevel();
        component.class = 
          level === 1 ? 'badge badge-info color-white' :
          level === 2 ? 'badge badge-warning color-white' : 'badge badge-danger color-white';
      }),
    new TableColumn<Ticket, 'department'>('دپارتمان', 'department').withTransform((data) =>
      data.toTicketDepartment()
    ),
    new TableColumn<Ticket, 'isAdminSide'>('وضعیت', 'isAdminSide').withTransform((data) =>
      data.toTicketStatus()
    ),
    new TableColumn<Ticket, 'dateCreated'>(' ایجاد', 'dateCreated')
      .withNgStyle(() => ({ 'font-size': '14px', 'color': '#ff4081' }))
      .withTransform((data) =>
        this.persianCalendarService.PersianCalendar(data)
        + ' ( ' +
        this.datePipe.transform(data, 'HH:mm')
        + ' )'
      ),
    new TableColumn<Ticket, 'dateModified'>('آخرین تغییر', 'dateModified')
      .withNgStyle(() => ({ 'font-size': '14px', 'color': '#ff4081' }))
      .withTransform((data) =>
        this.persianCalendarService.PersianCalendar(data)
        + ' ( ' +
        this.datePipe.transform(data, 'HH:mm')
        + ' )'
      ),
    new TableColumn<Ticket, 'id'>('عملیات', 'id')
      .withNgComponent(ButtonMPComponent)
      .withNgComponentInput((component: ButtonMPComponent, id) => {
        component.event = () => { this.router.navigate(['/panel/admin/tickets', id, 'detail']) };
        component.icon = "icon-bubbles";
        component.text = "مشاهده و پاسخ";
        component.type = UiType.Success;
      })
  ];

  constructor(private route: ActivatedRoute, private alertService: ToastrService
    , private ticketService: TicketsService,
    private router: Router, private store: Store<fromStore.State>,
    private persianCalendarService: PersianCalendarService, private datePipe: DatePipe) { }

  createDateRange(): Date[] {
    var currentYear = new Date().getFullYear();
    const dates: Date[] = [];
    for (let i: number = 0; i < 730; i++) {
      var tempDate = new Date();
      tempDate.setDate(tempDate.getDate() - 729);
      tempDate.setDate(tempDate.getDate() + i);
      dates.push(tempDate);
    }
    return dates;
  }
  ngOnInit() {
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
    this.search = {
      closed: 0,
      level: 0,
      department: 0,
      minDate: this.dateRange[0].getTime(),
      maxDate: this.dateRange[729].getTime(),
      isAdminSide: 0,
      filter: ''
    }
    this.onPageChange(this.pagination.currentPage, this.pagination.itemsPerPage);
  }
  onPageChange(offset: number, limit: number): Observable<Ticket[]> {
    let { sortDirection, sortHeader } = this.filterSortOrderBy;
    if (sortDirection === undefined || sortDirection == null) {
      sortDirection = '';
    }
    if (sortHeader === undefined || sortHeader == null) {
      sortHeader = '';
    }
    //offset : page index
    //limit : page size
    this.subManager.add(
      this.ticketService.getTickets(offset, limit,
        this.search, sortHeader, sortDirection)
        .subscribe((data) => {
          this.tickets = data.result;
          this.pagination = data.pagination;
        }, error => {
          this.alertService.error(error);
        })
    );
    return of(this.tickets);
  }
  onCloseChange( ticketId: string,event: any) {
    this.subManager.add(
      this.ticketService.setTicketClosed(ticketId, event.checked)
        .subscribe(() => {
          if (event.checked === true) {
            this.store.dispatch(new fromStore.DecUnClosedTicketCount());
            this.alertService.success('تیکت بسته شد', 'موفق');
          } else {
            this.store.dispatch(new fromStore.IncUnClosedTicketCount());
            this.alertService.success('تیکت باز شد', 'موفق');
          }
        }, error => {
          this.alertService.error(error);
        })
    )
  }
  onSearch() {
    this.onPageChange(this.pagination.currentPage, this.pagination.itemsPerPage);
  }

}
