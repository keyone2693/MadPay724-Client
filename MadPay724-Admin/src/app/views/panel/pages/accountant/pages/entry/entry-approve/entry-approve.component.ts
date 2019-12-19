import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';
import { Entry } from 'src/app/data/models/accountant/entry';
import { Pagination } from 'src/app/data/models/common/pagination';
import { FilterSortOrderBy } from 'src/app/data/models/common/filterSortOrderBy';
import { EntryService } from 'src/app/core/_services/panel/accountant/entry.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-entry-approve',
  templateUrl: './entry-approve.component.html',
  styleUrls: ['./entry-approve.component.css']
})
export class EntryApproveComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  subManager = new Subscription();
  entries: MatTableDataSource<Entry>;
  entriesArray: Entry[];
  pagination: Pagination;
  displayedColumns: string[] = ['id', 'ownerName', 'isApprove', 'isPardakht', 'isReject',
    'price', 'textForUser', 'actions'];

  filterSortOrderBy: FilterSortOrderBy = {
    sortDirection: '',
    sortHeader: '',
    searchKey: ''
  };

  loadingHideFlag = false;
  noContentHideFlag = true;
  constructor(private entryService: EntryService,
    private router: Router, private route: ActivatedRoute,
    private alertService: ToastrService) { }

  ngOnInit() {
    this.loadgetEntries();
  }
  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
  copied() {
    this.alertService.info('', 'کپی شد');
  }
  loadgetEntries() {
    this.route.data.subscribe(data => {
      this.entries = new MatTableDataSource(data.entriesapprove.result);
      this.pagination = data.entriesapprove.pagination;
      this.entriesArray = data.entriesapprove.result;
      this.entries.sort = this.sort;
      this.loadingHideFlag = true;
      if (data.entriesapprove.result.length === 0) {
        this.noContentHideFlag = false;
      }
    });

  }
  paginatorEvent(filter: any) {

    let { searchKey, sortDirection, sortHeader } = this.filterSortOrderBy;

    if (searchKey === undefined || searchKey == null) {
      searchKey = '';
    }
    if (sortDirection === undefined || sortDirection == null) {
      sortDirection = '';
    }
    if (sortHeader === undefined || sortHeader == null) {
      sortHeader = '';
    }
    this.subManager.add(
      this.entryService.getEntriesApprove(
        filter.pageIndex, filter.pageSize,
        searchKey.trim(), sortHeader, sortDirection)
        .subscribe((data) => {
          this.entries = new MatTableDataSource(data.result);
          this.pagination = data.pagination;
          this.entriesArray = data.result;
          this.entries.sort = this.sort;
        }, error => {
          this.alertService.error(error);
        })
    )
  }
  sortDataEvent(sort: any) {
    this.filterSortOrderBy.sortHeader = sort.active;
    this.filterSortOrderBy.sortDirection = sort.direction;
    this.applyFilter();
  }
  onSearchClear() {
    this.filterSortOrderBy.searchKey = '';
    this.applyFilter();
  }
  applyFilter() {
    let { searchKey, sortDirection, sortHeader } = this.filterSortOrderBy;
    if (searchKey === undefined || searchKey == null) {
      searchKey = '';
    }
    if (sortDirection === undefined || sortDirection == null) {
      sortDirection = '';
    }
    if (sortHeader === undefined || sortHeader == null) {
      sortHeader = '';
    }
    this.subManager.add(
      this.entryService.getEntriesApprove(
        this.pagination.currentPage, this.pagination.itemsPerPage,
        searchKey.trim(), sortHeader, sortDirection)
        .subscribe((data) => {
          this.entries = new MatTableDataSource(data.result);
          this.pagination = data.pagination;
          this.entriesArray = data.result;
          this.entries.sort = this.sort;
        }, error => {
          this.alertService.error(error);
        })
    )
  }

  onApproveChange(event: any, entryId: string) {
    this.subManager.add(
      this.entryService.changeApproveEntry(entryId, event.checked)
        .subscribe(() => {
          this.applyFilter();
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
          this.applyFilter();
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
          this.applyFilter();
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

}
