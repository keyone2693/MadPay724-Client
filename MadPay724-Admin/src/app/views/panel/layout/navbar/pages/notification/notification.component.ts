import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../../../../store';
import { Observable } from 'rxjs';
import { NotificationStateModel } from 'src/app/store/_model/notificationsStateModel';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  role$: Observable<string[]>
  notifications$: Observable<NotificationStateModel>
  constructor(private store: Store<fromStore.State>) {
    
    this.role$ = this.store.select(fromStore.getUserRoles);
    this.notifications$ = this.store.select(fromStore.getNotificationState)
  }

  ngOnInit() {
  }

  allNotifications(notifications: NotificationStateModel) {
    let sum = 0;
    for (let el in notifications) {
      if (typeof notifications[el] === 'number') {
        sum += notifications[el];
      }
    }
    return sum;
  }

}
