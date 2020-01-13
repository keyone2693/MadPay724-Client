import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';

import * as fromStore from '../../../../store';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inventory } from 'src/app/data/models/accountant/inventory';
import { PaginationResult } from 'src/app/data/models/common/paginationResult';
import { map } from 'rxjs/operators';
import { Role } from 'src/app/data/models/admin/role';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl = environment.apiUrl + environment.apiV1 + 'site/panel/admin/';
  userId: string;

  constructor(private http: HttpClient, private store: Store<fromStore.State>) {
    this.store.select(fromStore.getUserId).subscribe(data => {
      this.userId = data;
    });
  }

  getUsers(page?, itemPerPage?, filter?, sortHe?, sortDir?, userId: string = this.userId): Observable<PaginationResult<Inventory[]>> {
    const paginatedResult: PaginationResult<Inventory[]> = new PaginationResult<Inventory[]>();
    let params = new HttpParams();

    if (page != null && itemPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemPerPage);
      params = params.append('filter', filter);
      params = params.append('sortHe', sortHe);
      params = params.append('sortDir', sortDir);
    }
    return this.http.get<Inventory[]>
      (this.baseUrl + 'users', { observe: 'response', params })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        })
      );
  }
  getUserRoles(userId: string): Observable<Role[]> {
    return this.http.get<Role[]>(this.baseUrl + 'users/' + userId + '/roles');
  }

}
