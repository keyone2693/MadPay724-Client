import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Notify } from 'src/app/data/models/notify';
import { Store } from '@ngrx/store';

import * as fromStore from '../../../../store';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  baseUrl = environment.apiUrl + environment.apiV1 + 'site/panel/';
  userId: string;
  constructor(private http: HttpClient, private store: Store<fromStore.State>) {
    this.store.select(fromStore.getUserId).subscribe(data => {
      this.userId = data;
    });
  }

  getNotify(userId: string = this.userId): Observable<Notify> {
    return this.http.get<Notify>(this.baseUrl + 'notifications/' + userId);
}

  updateNotify(notify: Notify, userId: string = this.userId) {
    return this.http.put(this.baseUrl + 'users/' + userId + '/notifications', notify);
}

}
