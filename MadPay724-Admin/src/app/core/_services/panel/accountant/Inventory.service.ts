import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Store } from '@ngrx/store';

import * as fromStore from '../../../../store';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inventory } from 'src/app/data/models/accountant/inventory';
import { PaginationResult } from 'src/app/data/models/common/paginationResult';
import { map } from 'rxjs/operators';
import { Wallet } from 'src/app/data/models/wallet';
import { BankCard } from 'src/app/data/models/bankcard';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  baseUrl = environment.apiUrl + environment.apiV1 + 'site/panel/inventories/';
  userId: string;

  constructor(private http: HttpClient, private store: Store<fromStore.State>) {
    this.store.select(fromStore.getUserId).subscribe(data => {
      this.userId = data;
    });
  }

  getInventories(page?, itemPerPage?, filter?, sortHe?, sortDir?, userId: string = this.userId): Observable<PaginationResult<Inventory[]>> {
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
      (this.baseUrl , { observe: 'response', params })
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

  getInventoryWallets(userId: string): Observable<Wallet[]> {
    return this.http.get<Wallet[]>(this.baseUrl + 'wallets/' + userId );
  }

  getInventoryBankCards(userId: string): Observable<BankCard[]> {
    return this.http.get<BankCard[]>(this.baseUrl + 'bankcards/' + userId);
  }

  blockInventoryWallet(walletId: string, block: boolean) {
    return this.http.patch(this.baseUrl + 'blockwallet/' + walletId, { block });
  }

  approveInventoryBankCard(bankcardId: string, approve: boolean) {
    return this.http.patch(this.baseUrl + 'approvebankcard/' + bankcardId, { approve });
  }



  getWallets(page?, itemPerPage?, filter?, sortHe?, sortDir?, userId: string = this.userId):
    Observable<PaginationResult<Wallet[]>> {
    
    const paginatedResult: PaginationResult<Wallet[]> = new PaginationResult<Wallet[]>();
    let params = new HttpParams();

    if (page != null && itemPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemPerPage);
      params = params.append('filter', filter);
      params = params.append('sortHe', sortHe);
      params = params.append('sortDir', sortDir);
    }
    return this.http.get<Wallet[]>
      (this.baseUrl + 'allwallets', { observe: 'response', params })
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

  getBankCards(page?, itemPerPage?, filter?, sortHe?, sortDir?, userId: string = this.userId):
    Observable<PaginationResult<BankCard[]>> {

    const paginatedResult: PaginationResult<BankCard[]> = new PaginationResult<BankCard[]>();
    let params = new HttpParams();

    if (page != null && itemPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemPerPage);
      params = params.append('filter', filter);
      params = params.append('sortHe', sortHe);
      params = params.append('sortDir', sortDir);
    }
    return this.http.get<BankCard[]>
      (this.baseUrl + 'allbankcards', { observe: 'response', params })
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

}
