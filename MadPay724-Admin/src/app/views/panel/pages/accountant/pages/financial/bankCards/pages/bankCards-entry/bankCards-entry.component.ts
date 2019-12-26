import { Component, OnInit, OnDestroy } from '@angular/core';
import { Entry } from 'src/app/data/models/accountant/entry';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EntryService } from 'src/app/core/_services/panel/accountant/entry.service';
import { Subscription, Observable } from 'rxjs';
import { TableColumn, ButtonType } from 'simplemattable';
import { CurrentTitleStateModel } from '../../../../../store/_models/currentTitleStateModel';
import { Store } from '@ngrx/store';
import { AccountantStateModel } from '../../../../../store/_models/accountantStateModel';
import * as fromAccountantStore from '../../../../../store';
import { Title } from '@angular/platform-browser';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-bankCards-entry',
  templateUrl: './bankCards-entry.component.html',
  styleUrls: ['./bankCards-entry.component.css']
})
export class BankCardsEntryComponent implements OnInit, OnDestroy {
  subManager = new Subscription();
  bankcardEntries: Entry[];
  bankcardInfo$: Observable<CurrentTitleStateModel>
  columnsSimple = [
    new TableColumn<Entry, 'id'>('شناسه', 'id'),
    new TableColumn<Entry, 'ownerName'>('صاحب حساب', 'ownerName'),
    new TableColumn<Entry, 'isApprove'>('تاییدی', 'isApprove'),
    new TableColumn<Entry, 'isPardakht'>('پرداختی', 'isPardakht'),
    new TableColumn<Entry, 'isReject'>('ردی', 'isReject'),
    new TableColumn<Entry, 'price'>('مبلغ', 'price'),
    new TableColumn<Entry, 'textForUser'>(' نمایش متن', 'textForUser'),
    new TableColumn<Entry, 'id'>('عملیات', 'id')
      .withTransform(() => 'جزییات و ویرایش')
      .withButton(ButtonType.RAISED)
      .withButtonColor('primary')
      .withOnClick(id => {
        console.log('id');
      })
  ];
  constructor(private route: ActivatedRoute, private alertService: ToastrService
    , private entryService: EntryService, private store: Store<AccountantStateModel>) { }

  ngOnInit() {
    this.loadBancardEntries();
    this.bankcardInfo$ = this.store.select(fromAccountantStore.getCurrentTitle);
  }
  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
  loadBancardEntries() {
    this.subManager.add(
      this.route.data.subscribe(data => {
        this.bankcardEntries = data.entries;
       
      })
    );
  }
}
