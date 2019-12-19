import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { BankCard } from 'src/app/data/models/bankcard';
import { Pagination } from 'src/app/data/models/common/pagination';
import { FilterSortOrderBy } from 'src/app/data/models/common/filterSortOrderBy';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { InventoryService } from 'src/app/core/_services/panel/accountant/Inventory.service';
import { AccountantStateModel } from '../../../../../store/_models/accountantStateModel';

import * as fromAccountantStore from '../../../../../store';

@Component({
  selector: 'app-accountant-bankCards-list',
  templateUrl: './accountant-bankCards-list.component.html',
  styleUrls: ['./accountant-bankCards-list.component.css']
})
export class AccountantBankCardsListComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  subManager = new Subscription();
  bankCards: MatTableDataSource<BankCard>;
  bankCardsArray: BankCard[];
  pagination: Pagination;
  displayedColumns: string[] = ['id', 'ownerName', 'approve', 'bankName',
    'cardNumber', 'hesabNumber',
    'shaba', 'exDate', 'actions'];

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
    this.loadgetBankCards();
  }
  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
  copied() {
    this.alertService.info('', 'کپی شد');
  }
  loadgetBankCards() {
    this.route.data.subscribe(data => {
      this.bankCards = new MatTableDataSource(data.bankcards.result);
      this.pagination = data.bankcards.pagination;
      this.bankCardsArray = data.bankcards.result;
      this.bankCards.sort = this.sort;
      this.loadingHideFlag = true;
      if (data.bankcards.result.length === 0) {
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
      this.inventoryService.getBankCards(
        filter.pageIndex, filter.pageSize,
        searchKey.trim(), sortHeader, sortDirection)
        .subscribe((data) => {
          this.bankCards = new MatTableDataSource(data.result);
          this.pagination = data.pagination;
          this.bankCardsArray = data.result;
          this.bankCards.sort = this.sort;
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
      this.inventoryService.getBankCards(
        this.pagination.currentPage, this.pagination.itemsPerPage,
        searchKey.trim(), sortHeader, sortDirection)
        .subscribe((data) => {
          this.bankCards = new MatTableDataSource(data.result);
          this.pagination = data.pagination;
          this.bankCardsArray = data.result;
          this.bankCards.sort = this.sort;
        }, error => {
          this.alertService.error(error);
        })
    )
  }

  onApproveChange(event: any, bancardId: string) {
    this.subManager.add(
      this.inventoryService.approveInventoryBankCard(bancardId, event.checked)
        .subscribe(() => {
          if (event.checked === true) {
            this.alertService.success('کارت بانکی تایید شد', 'موفق');
          } else {
            this.alertService.success('کارت بانکی از حالت تایید خارج شد', 'موفق');
          }
        }, error => {
          this.alertService.error(error);
        })
    )
  }

}
