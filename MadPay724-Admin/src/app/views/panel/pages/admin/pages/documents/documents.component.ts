import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Subscription, Observable, of, fromEvent, Subject } from 'rxjs';
import { TableColumn } from 'simplemattable';
import { CheckboxMPComponent } from 'src/app/shared/component/checkbox-mp/checkbox-mp.component';
import { UiType } from 'src/app/data/enums/uiType.enum';
import { Document } from 'src/app/data/models/document'; 
import { HtmlMpComponent } from 'src/app/shared/component/html-mp/html-mp.component';
import { InputMpComponent } from 'src/app/shared/component/input-mp/input-mp.component';
import { ButtonMPComponent } from 'src/app/shared/component/button-mp/button-mp.component';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentService } from 'src/app/core/_services/panel/admin/document.service';
import { Pagination } from 'src/app/data/models/common/pagination';
import { FilterSortOrderBy } from 'src/app/data/models/common/filterSortOrderBy';
import { Sort } from '@angular/material/sort';
import { distinctUntilChanged, map, debounceTime, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit, OnDestroy {
  @ViewChild('searchKey', { static: false }) filter: ElementRef;
  subManager = new Subscription();
  documents: Document[];
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
    new TableColumn<Document, 'picUrl'>('ایکن', 'picUrl')
      .withNgComponent(HtmlMpComponent)
      .withNgComponentInput((component: HtmlMpComponent, iconUrl) => {
        component.isImage = true;
        component.text = iconUrl;
        component.class = 'img-icon';
      }),
    new TableColumn<Document, 'id'>('شناسه', 'id')
      .withNgComponent(InputMpComponent)
      .withNgComponentInput((component: InputMpComponent, id) => {
        component.event = () => { };
        component.disabled = false;
        component.iconColor = UiType.InputInfo;
        component.text = id;
        component.isForCopy = true;
        component.icon = "ft-copy";
      }),
    new TableColumn<Document, 'name'>('نام', 'name'),
    new TableColumn<Document, 'name'>('نام پدر/کدثبت', 'name'),
    new TableColumn<Document, 'isTrue'>('کاربری حقیقی/حقوقی', 'isTrue')
      .withNgComponent(CheckboxMPComponent)
      .withNgComponentInput((component: CheckboxMPComponent, isTrue) => {
        component.checked = isTrue;
        component.disabled = true;
        component.type = UiType.Info;
      }),
    new TableColumn<Document, 'approve'>('وضعیت', 'approve')
      .withNgComponent(HtmlMpComponent)
      .withNgComponentInput((component: HtmlMpComponent, approve, document) => {
        component.isBadge = true;
        component.text = approve.toDocStatus();
        component.class =
          approve === 0 ? 'badge badge-info color-white' :
          approve === 1 ? 'badge badge-success color-white' : 'badge badge-danger color-white';
      }),
    new TableColumn<Document, 'nationalCode'>('کد ملی', 'nationalCode')
      .withNgComponent(InputMpComponent)
      .withNgComponentInput((component: InputMpComponent, id) => {
        component.event = () => { };
        component.disabled = false;
        component.iconColor = UiType.InputInfo;
        component.text = id;
        component.isForCopy = true;
        component.icon = "ft-copy";
      }),
    new TableColumn<Document, 'message'>('متن', 'message')
      .withNgComponent(HtmlMpComponent)
      .withNgComponentInput((component: HtmlMpComponent, message) => {
        component.text = message.substring(0, 10) + '...';
        component.isTooltip = true;
        component.tooltipText = message;
        component.tooltipPosition = 'below';
        component.class = 'txtwxp';
      }),
    new TableColumn<Document, 'id'>('عملیات', 'id')
      .withNgComponent(ButtonMPComponent)
      .withNgComponentInput((component: ButtonMPComponent, id, document) => {
        component.event = () => {
          this.router.navigate(['/panel/admin/documents', document.id, 'details']);
        };
        component.icon = "ft-alert-octagon";
        component.text = "جزییات و ویرایش";
        component.type = UiType.Success;
      })
  ];
  constructor(private alertService: ToastrService
    , private documentService: DocumentService,private loc: Location,
    private router: Router, private route: ActivatedRoute) { }


  ngOnInit() {
  }
  ngOnDestroy() {
    this.subManager.unsubscribe();
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
  sortEvent(data: Sort) {
    this.filterSortOrderBy.sortHeader = data.active.split('_')[1];
    this.filterSortOrderBy.sortDirection = data.direction;
    this.onPageChange(this.pagination.currentPage, this.pagination.itemsPerPage);
  }
  onSearchClear() {
    this.onPageChange(this.pagination.currentPage, this.pagination.itemsPerPage);
  }
  onPageChange(offset: number, limit: number, filter?: string): Observable<Document[]> {

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
    setTimeout(() => {
      this.subManager.add(
        this.documentService.getDocuments(offset, limit,
          filter.trim(), sortHeader, sortDirection)
          .subscribe((data) => {
            this.documents = data.result;
            this.pagination = data.pagination;
          }, error => {
            this.alertService.error(error);
          })
      );
    });
    return of(this.documents);
  }

  onBack() {
    this.loc.back();
  }

}
