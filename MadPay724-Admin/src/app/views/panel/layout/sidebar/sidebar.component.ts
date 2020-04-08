import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromStore from '../../../../store';
import { Store } from '@ngrx/store';
import { NotificationStateModel } from 'src/app/store/_model/notificationsStateModel';
import { Observable } from 'rxjs';

import 'src/app/shared/extentions/number.extentions';
import { StyleScriptService } from 'src/app/core/_services/common/styleScript.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  notifications$: Observable<NotificationStateModel>
  constructor(private store: Store<fromStore.State>, private styleScriptService: StyleScriptService) {
    this.loadBlogNotify();
    this.styleScriptService.addScript("sidebar", './assets/js/app-sidebar.js');
  }
  loadBlogNotify() {
    this.notifications$ =
      this.store.select(fromStore.getNotificationState);
  }
  ngOnInit() {
  }

  ngOnDestroy() {
    this.styleScriptService.removeScript("sidebar");

  }

  getEntryNotifySum(unCheckedEntry: number, unSpecifiedEntry:number): number {
    return unCheckedEntry + unSpecifiedEntry
  }

  getMaliNotifySum(unVerifiedGateInPast7Days: number, unVerifiedBankCardInPast7Days: number): number {
    return unVerifiedGateInPast7Days + unVerifiedBankCardInPast7Days
  }

}
