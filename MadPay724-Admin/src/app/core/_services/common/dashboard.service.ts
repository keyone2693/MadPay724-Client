import { Injectable } from '@angular/core';
import * as fromStore from '../../../store';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NotificationStateModel } from 'src/app/store/_model/notificationsStateModel';
import { UserDashboard } from 'src/app/data/models/common/userDashboard';
import { AdminDashboard } from 'src/app/data/models/common/adminDashboard';
import { BlogDashboard } from 'src/app/data/models/common/blogDashboard';
import { AccountantDashboard } from 'src/app/data/models/common/accountantDashboard';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  baseUrl = environment.apiUrl + environment.apiV1 + 'site/panel/';
  userId: string;
  constructor(private http: HttpClient, private store: Store<fromStore.State>) {
    this.store.select(fromStore.getUserId).subscribe(data => {
      this.userId = data;
    });
  }
  getAdminDashboard(userId: string = this.userId): Observable<AdminDashboard> {
    return this.http.get<AdminDashboard>
      (this.baseUrl + 'admin/common/dashboard');
  }
  getAccountantDashboard(userId: string = this.userId): Observable<AccountantDashboard> {
    return this.http.get<AccountantDashboard>
      (this.baseUrl + 'accountant/common/dashboard');
  }
  getBlogDashboard(userId: string = this.userId): Observable<BlogDashboard> {
    return this.http.get<BlogDashboard>
      (this.baseUrl + 'blog/' + userId + '/common/dashboard');
  }
  getUserDashboard(userId: string = this.userId): Observable<UserDashboard> {
    return this.http.get<UserDashboard>
      (this.baseUrl + 'user/' + userId + '/common/dashboard');
  }
}
