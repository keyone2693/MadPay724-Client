import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as fromStore from '../../../../store';
import { Store } from '@ngrx/store';
import { FactorDetail } from 'src/app/data/models/accountant/factorDetail';

@Injectable({
  providedIn: 'root'
})
export class UserFactorService {
  baseUrl = environment.apiUrl + environment.apiV1 + 'site/panel/users/';
  userId: string;

  constructor(private http: HttpClient, private store: Store<fromStore.State>) { 
    this.store.select(fromStore.getUserId).subscribe(data => {
      this.userId = data;
    });
  }
  
  getFactor(factorId: string, userId: string = this.userId): Observable<FactorDetail> {
    return this.http.get<FactorDetail>(this.baseUrl + userId + '/factors/' + factorId);
  }
 
}
