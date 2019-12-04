import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/data/models/user';
import { Store } from '@ngrx/store';

import * as fromStore from '../../../store';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl + environment.apiV1 + 'site/panel/users/';
  userId: string;

  constructor(private http: HttpClient, private store: Store<fromStore.State>) {
    this.store.select(fromStore.getUserId).subscribe(data => {
      this.userId = data;
    });  }

  getUser(userId: string = this.userId): Observable<User> {
    return this.http.get<User>(this.baseUrl + userId);
}

  updateUserInfo(user: User, userId: string = this.userId) {
    return this.http.put(this.baseUrl + userId, user);
}

  updateUserPass(passModel: any, userId: string = this.userId) {
    return this.http.put(this.baseUrl + 'ChangeUserPassword/' + userId, passModel);
}
  
}
