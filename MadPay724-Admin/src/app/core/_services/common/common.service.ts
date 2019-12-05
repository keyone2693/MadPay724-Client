import { Injectable } from '@angular/core';
import * as fromStore from '../../../store';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NotificationStateModel } from 'src/app/store/_model/notificationsStateModel';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  baseUrl = environment.apiUrl + environment.apiV1 + 'site/panel/';
  userId: string;
  constructor(private http: HttpClient, private store: Store<fromStore.State>) {
    this.store.select(fromStore.getUserId).subscribe(data => {
      this.userId = data;
    });
  }
  getNotification(userId: string = this.userId): Observable<NotificationStateModel> {
    return this.http.get<NotificationStateModel>
      (this.baseUrl + 'users/' + userId + '/common/getnotifications');
  }
}
