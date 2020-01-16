import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../../../../../../../store';
import { InventoryService } from 'src/app/core/_services/panel/accountant/Inventory.service';
import { BankCard } from 'src/app/data/models/bankcard';
import { CurrentTitleStateModel } from 'src/app/store/_model/currentTitleStateModel';

@Component({
  selector: 'app-inventory-bankCard-list',
  templateUrl: './inventory-bankCard-list.component.html',
  styleUrls: ['./inventory-bankCard-list.component.css']
})
export class InventoryBankCardListComponent implements OnInit, OnDestroy {
  subManager = new Subscription();
  bankCards: MatTableDataSource<BankCard>;
  bankCardsArray: BankCard[];
  displayedColumns: string[] = ['id', 'ownerName', 'approve', 'bankName',
    'cardNumber', 'hesabNumber',
    'shaba', 'exDate', 'actions'];
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
    this.loadbankCards();
  }
  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
  loadbankCards() {
    this.subManager.add(
      this.route.data.subscribe(data => {
        this.bankCards = new MatTableDataSource(data.inventorybankcards);
        this.bankCardsArray = data.inventorybankcards;
        this.bankCards.sort = this.sort;
        this.bankCards.paginator = this.paginator;
        this.loadingHideFlag = true;
        if (data.inventorybankcards.length === 0) {
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
    this.bankCards.filter = this.searchKey.trim();
  }

  copied() {
    this.alertService.info('', 'کپی شد');
  }
  onApproveChange(event: any, bancardId: string) {
    this.subManager.add(
      this.inventoryService.approveInventoryBankCard(bancardId, event.checked)
        .subscribe(() => {
          if (event.checked === true) {
            this.store.dispatch(new fromStore.DecUnVerifiedBankCardCount());
            this.alertService.success('کارت بانکی تایید شد', 'موفق');
          } else {
            this.store.dispatch(new fromStore.IncUnVerifiedBankCardCount());
            this.alertService.success('کارت بانکی از حالت تایید خارج شد', 'موفق');
          }
        }, error => {
          this.alertService.error(error);
        })
    )
  }
  onBankCardClick(bancard: BankCard) {
    this.store.dispatch(new fromStore.EditCurrentTitle(
      { id: bancard.id, title: bancard.cardNumber }));
    this.router.navigate(['/panel/accountant/bankcards', bancard.id, 'entry'])
  }
}
