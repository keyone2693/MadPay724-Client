import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Gate } from 'src/app/data/models/user/gate';

import { PaginationResult } from 'src/app/data/models/common/paginationResult';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GateAccService {
  baseUrl = environment.apiUrl + environment.apiV1 + 'site/panel/';
  userId: string;
  constructor(private http: HttpClient) {
  }
  getAccGates(page?, itemPerPage?, filter?, sortHe?, sortDir?):
    Observable<PaginationResult<Gate[]>> {
    const paginatedResult: PaginationResult<Gate[]> = new PaginationResult<Gate[]>();
    let params = new HttpParams();

    if (page != null && itemPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemPerPage);
      params = params.append('filter', filter);
      params = params.append('sortHe', sortHe);
      params = params.append('sortDir', sortDir);
    }
    return this.http.get<Gate[]>
      (this.baseUrl + 'financial/allgates/', { observe: 'response', params })
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
  getWalletGates(walletId: string, page?, itemPerPage?, filter?, sortHe?, sortDir?):
    Observable<PaginationResult<Gate[]>> {
    const paginatedResult: PaginationResult<Gate[]> = new PaginationResult<Gate[]>();
    let params = new HttpParams();

    if (page != null && itemPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemPerPage);
      params = params.append('filter', filter);
      params = params.append('sortHe', sortHe);
      params = params.append('sortDir', sortDir);
    }
    return this.http.get<Gate[]>
      (this.baseUrl + 'financial/wallets/' + walletId + '/gates/', { observe: 'response', params })
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

  changeActiveGate(gateId: string, flag: any) {
    return this.http.patch(this.baseUrl + 'financial/gates/' + gateId + '/activegate', {flag});
  }
  changeDirectGate(gateId: string, flag: any) {
    return this.http.patch(this.baseUrl + 'financial/gates/' + gateId + '/directgate', {flag});
  }
  changeIpGate(gateId: string, flag: any) {
    return this.http.patch(this.baseUrl + 'financial/gates/' + gateId + '/ipgate',{flag});
  }
}
