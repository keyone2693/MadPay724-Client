import { Component, OnInit, OnDestroy } from '@angular/core';
import { Entry } from 'src/app/data/models/accountant/entry';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EntryService } from 'src/app/core/_services/panel/accountant/entry.service';
import { Subscription, Observable } from 'rxjs';
import { TableColumn, ButtonType, Align } from 'simplemattable';
import { CurrentTitleStateModel } from '../../../../../store/_models/currentTitleStateModel';
import { Store } from '@ngrx/store';
import { AccountantStateModel } from '../../../../../store/_models/accountantStateModel';
import * as fromAccountantStore from '../../../../../store';
import { UiType } from 'src/app/data/enums/uiType.enum';
import { CheckboxMPComponent } from 'src/app/shared/component/checkbox-mp/checkbox-mp.component';
import { ButtonMPComponent } from 'src/app/shared/component/button-mp/button-mp.component';

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
    new TableColumn<Entry, 'isApprove'>('تاییدی', 'isApprove')
      .withNgComponent(CheckboxMPComponent)
      .withNgComponentInput((component: CheckboxMPComponent, isApprove) => {
        component.event = () => { console.log(isApprove) };
        component.checked = isApprove;
        component.disabled = false;
        component.type = UiType.Info;
      }),
    new TableColumn<Entry, 'isPardakht'>('پرداختی', 'isPardakht')
      .withNgComponent(CheckboxMPComponent)
      .withNgComponentInput((component: CheckboxMPComponent, isPardakht) => {
        component.event = () => { console.log(isPardakht) };
        component.checked = isPardakht;
        component.disabled = false;
        component.type = UiType.Success;
      }),
    new TableColumn<Entry, 'isReject'>('ردی', 'isReject')
      .withNgComponent(CheckboxMPComponent)
      .withNgComponentInput((component: CheckboxMPComponent, isReject) => {
        component.event = () => { console.log(isReject) };
        component.checked = isReject;
        component.disabled = false;
        component.type = UiType.Error;
      }),
    new TableColumn<Entry, 'price'>('مبلغ', 'price'),
    new TableColumn<Entry, 'textForUser'>(' نمایش متن', 'textForUser'),
    new TableColumn<Entry, 'id'>('عملیات', 'id')
      .withNgComponent(ButtonMPComponent)
      .withNgComponentInput((component: ButtonMPComponent, id) => {
        component.event = () => { console.log(id); this.router.navigate(['/panel/accountant/bankcards']) };
        component.icon = "ft-alert-octagon";
        component.text = " جزییات و ویرایش";
        component.type = UiType.Success;
      })
  ];
  constructor(private route: ActivatedRoute, private alertService: ToastrService
    , private entryService: EntryService, private store: Store<AccountantStateModel>, private router: Router) { }

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
