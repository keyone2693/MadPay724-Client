import { Component, OnInit } from '@angular/core';
import * as fromStore from '../../../../store';
import { Store } from '@ngrx/store';
import { NotificationStateModel } from 'src/app/store/_model/notificationsStateModel';
import { Observable } from 'rxjs';

import 'src/app/shared/extentions/number.extentions';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  url = '../../../../../assets/js/app-sidebar.js';
  loadAPI: any;
  notifications$: Observable<NotificationStateModel>
  constructor(private store: Store<fromStore.State>) {
    this.loadBlogNotify();
  }
  loadBlogNotify() {
    this.notifications$ =
      this.store.select(fromStore.getNotificationState);
  }
  ngOnInit() {
    this.loadAPI = new Promise(resolve => {
      this.loadScript();
    });
  }

  public loadScript() {
    const node = document.createElement('script');
    node.src = this.url;
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.body.appendChild(node);
  }

  getEntryNotifySum(unCheckedEntry: number, unSpecifiedEntry:number): number {
    return unCheckedEntry + unSpecifiedEntry
  }

  getMaliNotifySum(unVerifiedGateInPast7Days: number, unVerifiedBankCardInPast7Days: number): number {
    return unVerifiedGateInPast7Days + unVerifiedBankCardInPast7Days
  }

}
