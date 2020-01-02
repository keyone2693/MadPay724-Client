import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';
import { Wallet } from 'src/app/data/models/wallet';
import { Pagination } from 'src/app/data/models/common/pagination';
import { FilterSortOrderBy } from 'src/app/data/models/common/filterSortOrderBy';
import { InventoryService } from 'src/app/core/_services/panel/accountant/Inventory.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountantStateModel } from '../../../../../store/_models/accountantStateModel';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';

import * as fromAccountantStore from '../../../../../store';


@Component({
  selector: 'app-wallets-list',
  templateUrl: './wallets-list.component.html',
  styleUrls: ['./wallets-list.component.css']
})
export class WalletsListComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  subManager = new Subscription();
  wallets: MatTableDataSource<Wallet>;
  walletsArray: Wallet[];
  pagination: Pagination;
  displayedColumns: string[] = ['id', 'name', 'isBlock', 'isMain', 'isSms', 'inventory',
    'interMoney', 'exitMoney',
    'onExitMoney', 'actions'];

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
    this.loadgetWallets();
  }
  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
  copied() {
    this.alertService.info('', 'کپی شد');
  }
  loadgetWallets() {
    this.route.data.subscribe(data => {
      this.wallets = new MatTableDataSource(data.wallets.result);
      this.pagination = data.wallets.pagination;
      this.walletsArray = data.wallets.result;
      this.wallets.sort = this.sort;
      this.loadingHideFlag = true;
      if (data.wallets.result.length === 0) {
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
      this.inventoryService.getWallets(
        filter.pageIndex, filter.pageSize,
        searchKey.trim(), sortHeader, sortDirection)
        .subscribe((data) => {
          this.wallets = new MatTableDataSource(data.result);
          this.pagination = data.pagination;
          this.walletsArray = data.result;
          this.wallets.sort = this.sort;
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
      this.inventoryService.getWallets(
        this.pagination.currentPage, this.pagination.itemsPerPage,
        searchKey.trim(), sortHeader, sortDirection)
        .subscribe((data) => {
          this.wallets = new MatTableDataSource(data.result);
          this.pagination = data.pagination;
          this.walletsArray = data.result;
          this.wallets.sort = this.sort;
        }, error => {
          this.alertService.error(error);
        })
    )
  }

  onBlockChange(event: any, walletId: string) {
    this.subManager.add(
      this.inventoryService.blockInventoryWallet(walletId, event.checked)
        .subscribe(() => {
          if (event.checked === true) {
            this.alertService.success('کیف پول بلاک شد', 'موفق');
          } else {
            this.alertService.success('کیف پول از حالت بلاک خارج شد', 'موفق');
          }
        }, error => {
          this.alertService.error(error);
        })
    )
  }
  onWalletClick(wallet: Wallet) {
    this.store.dispatch(new fromAccountantStore.EditCurrentTitle(
      { id: wallet.id, title: wallet.name }));
    this.router.navigate(['/panel/accountant/wallets', wallet.id, 'entry'])
  }

}
