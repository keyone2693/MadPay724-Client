import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Wallet } from 'src/app/data/models/wallet';
import { Router, ActivatedRoute } from '@angular/router';
import { InventoryService } from 'src/app/core/_services/panel/accountant/Inventory.service';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';

import * as fromStore from '../../../../../../../../../store';
import { CurrentTitleStateModel } from 'src/app/store/_model/currentTitleStateModel';


@Component({
  selector: 'app-inventory-wallet-list',
  templateUrl: './inventory-wallet-list.component.html',
  styleUrls: ['./inventory-wallet-list.component.css']
})
export class InventoryWalletListComponent implements OnInit, OnDestroy {
  subManager = new Subscription();
  wallets: MatTableDataSource<Wallet>;
  walletsArray: Wallet[];
  displayedColumns: string[] = ['id', 'name', 'isBlock', 'isMain', 'isSms', 'inventory',
    'interMoney', 'exitMoney',
    'onExitMoney', 'actions'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  searchKey: string;
  loadingHideFlag = false;
  noContentHideFlag = true;
  userInfo$: Observable<CurrentTitleStateModel>;
  constructor(private inventoryService: InventoryService,
    private router: Router, private route: ActivatedRoute,
    private alertService: ToastrService, private store: Store<fromStore.State>) {
    this.userInfo$ = this.store.select(fromStore.getCurrentTitle);
  }

  ngOnInit() {
    this.loadwallets();
  }
  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
  loadwallets() {
    this.subManager.add(
      this.route.data.subscribe(data => {
        this.wallets = new MatTableDataSource(data.inventorywallets);
        this.walletsArray = data.inventorywallets;
        this.wallets.sort = this.sort;
        this.wallets.paginator = this.paginator;
        this.loadingHideFlag = true;
        if (data.inventorywallets.length === 0) {
          this.noContentHideFlag = false;
        }
      }, error => {
        this.alertService.error(error, 'خطا');
        this.loadingHideFlag = false;
      }
      )
    );

  }
  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }
  applyFilter() {
    this.wallets.filter = this.searchKey.trim();
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
  copied() {
    this.alertService.info('', 'کپی شد');
  }
  onWalletClick(wallet: Wallet) {
    this.store.dispatch(new fromStore.EditCurrentTitle(
      { id: wallet.id, title: wallet.name }));
    this.router.navigate(['/panel/accountant/wallets', wallet.id, 'entry'])
  }
  onWalletFactorsClick(wallet: Wallet) {
    this.store.dispatch(new fromStore.EditCurrentTitle(
      { id: wallet.id, title: wallet.name }));
    this.router.navigate(['/panel/accountant/wallets', wallet.id, 'factors'])
  }
  onWalletGatesClick(wallet: Wallet) {
    this.store.dispatch(new fromStore.EditCurrentTitle(
      { id: wallet.id, title: wallet.name }));
    this.router.navigate(['/panel/accountant/wallets', wallet.id, 'gates'])
  }
}
