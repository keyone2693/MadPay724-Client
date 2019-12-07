import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';
import { Pagination } from 'src/app/data/models/common/pagination';
import { FilterSortOrderBy } from 'src/app/data/models/common/filterSortOrderBy';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { Inventory } from 'src/app/data/models/accountant/inventory';
import { InventoryService } from 'src/app/core/_services/panel/accountant/Inventory.service';
import { AccountantStateModel } from '../../../../store/_models/accountantStateModel';

import * as fromAccountantStore from '../../../../store';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css']
})
export class InventoryListComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  subManager = new Subscription();
  inventories: MatTableDataSource<Inventory>;
  inventoriesArray: Inventory[];
  pagination: Pagination;
  displayedColumns: string[] = ['photoUrl','id',  'name', 'userName',
    'phoneNumber', 'age', 'inventorySum', 'interMoneySum',
    'exitMoneySum', 'onExitMoneySum', 'actions'];

  filterSortOrderBy: FilterSortOrderBy = {
    sortDirection: '',
    sortHeader: '',
    searchKey: ''
  };

  loadingHideFlag = false;
  noContentHideFlag = true;
  constructor(private inventoryService: InventoryService,
    private router: Router, private route: ActivatedRoute,
    private alertService: ToastrService, private store: Store<AccountantStateModel>) { }

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
      this.inventories = new MatTableDataSource(data.inventories.result);
      this.pagination = data.inventories.pagination;
      this.inventoriesArray = data.inventories.result;
      this.inventories.sort = this.sort;
      this.loadingHideFlag = true;
      if (data.inventories.result.length === 0) {
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
      this.inventoryService.getInventories(
        filter.pageIndex, filter.pageSize,
        searchKey.trim(), sortHeader, sortDirection)
        .subscribe((data) => {
          this.inventories = new MatTableDataSource(data.result);
          this.pagination = data.pagination;
          this.inventoriesArray = data.result;
          this.inventories.sort = this.sort;
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
      this.inventoryService.getInventories(
        this.pagination.currentPage, this.pagination.itemsPerPage,
        searchKey.trim(), sortHeader, sortDirection)
        .subscribe((data) => {
          this.inventories = new MatTableDataSource(data.result);
          this.pagination = data.pagination;
          this.inventoriesArray = data.result;
          this.inventories.sort = this.sort;
        }, error => {
          this.alertService.error(error);
        })
    )
  }

  //----------------------------
  onWallet(user: Inventory) {
    this.store.dispatch(new fromAccountantStore.EditCurrentTitle({
      id: user.id,
      title: user.name
    }))
  }
  onBankCard(user: Inventory) {
    this.store.dispatch(new fromAccountantStore.EditCurrentTitle({
      id: user.id,
      title: user.name
    }))
  }
}
