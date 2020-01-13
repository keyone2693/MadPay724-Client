import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';
import { Inventory } from 'src/app/data/models/accountant/inventory';
import { Pagination } from 'src/app/data/models/common/pagination';
import { FilterSortOrderBy } from 'src/app/data/models/common/filterSortOrderBy';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';

import * as fromStore from '../../../../../../../../store';
import { UsersService } from 'src/app/core/_services/panel/admin/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  subManager = new Subscription();
  users: MatTableDataSource<Inventory>;
  usersArray: Inventory[];
  pagination: Pagination;
  displayedColumns: string[] = ['photoUrl', 'id', 'name', 'userName',
    'phoneNumber', 'age', 'inventorySum', 'interMoneySum',
    'exitMoneySum', 'onExitMoneySum', 'actions'];

  filterSortOrderBy: FilterSortOrderBy = {
    sortDirection: '',
    sortHeader: '',
    searchKey: ''
  };

  loadingHideFlag = false;
  noContentHideFlag = true;
  constructor(private usersService: UsersService,
    private router: Router, private route: ActivatedRoute,
    private alertService: ToastrService, private store: Store<fromStore.State>) { }

  ngOnInit() {
    this.loadgetInventories();
  }
  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
  copied() {
    this.alertService.info('', 'کپی شد');
  }
  loadgetInventories() {
    this.route.data.subscribe(data => {
      this.users = new MatTableDataSource(data.users.result);
      this.pagination = data.users.pagination;
      this.usersArray = data.users.result;
      this.users.sort = this.sort;
      this.loadingHideFlag = true;
      if (data.users.result.length === 0) {
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
      this.usersService.getUsers(
        filter.pageIndex, filter.pageSize,
        searchKey.trim(), sortHeader, sortDirection)
        .subscribe((data) => {
          this.users = new MatTableDataSource(data.result);
          this.pagination = data.pagination;
          this.usersArray = data.result;
          this.users.sort = this.sort;
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
      this.usersService.getUsers(
        this.pagination.currentPage, this.pagination.itemsPerPage,
        searchKey.trim(), sortHeader, sortDirection)
        .subscribe((data) => {
          this.users = new MatTableDataSource(data.result);
          this.pagination = data.pagination;
          this.usersArray = data.result;
          this.users.sort = this.sort;
        }, error => {
          this.alertService.error(error);
        })
    )
  }

  //----------------------------
  onWallet(user: Inventory) {
    this.store.dispatch(new fromStore.EditCurrentTitle({
      id: user.id,
      title: user.name
    }))
  }
  onBankCard(user: Inventory) {
    this.store.dispatch(new fromStore.EditCurrentTitle({
      id: user.id,
      title: user.name
    }))
  }
}
