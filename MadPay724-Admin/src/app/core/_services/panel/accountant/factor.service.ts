import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginationResult } from 'src/app/data/models/common/paginationResult';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Factor } from 'src/app/data/models/accountant/factor';
import { Wallet } from 'src/app/data/models/wallet';
import { FactorSearch } from 'src/app/data/models/accountant/factorSearch';

@Injectable({
  providedIn: 'root'
})
export class FactorService {
  baseUrl = environment.apiUrl + environment.apiV1 + 'site/panel/factors/';
  baseGateUrl = environment.apiUrl + environment.apiV1 + 'site/panel/';
  walletFactorsbaseUrl = environment.apiUrl + environment.apiV1 + 'site/panel/wallets/';

  constructor(private http: HttpClient) { }
  getFactors(page?, itemPerPage?, filter?: FactorSearch, sortHe?, sortDir?):
    Observable<PaginationResult<Factor[]>> {
    const paginatedResult: PaginationResult<Factor[]> = new PaginationResult<Factor[]>();
    let params = new HttpParams();

    if (page != null && itemPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemPerPage);
      params = params.append('filter', filter.filter);
      params = params.append('bank', filter.bank.toString());
      params = params.append('factorType', filter.factorType.toString());
      params = params.append('minDate', filter.minDate.toString());
      params = params.append('maxDate', filter.maxDate.toString());
      params = params.append('minPrice', filter.minPrice.toString());
      params = params.append('maxPrice', filter.maxPrice.toString());
      params = params.append('status', filter.status.toString());
      params = params.append('sortHe', sortHe);
      params = params.append('sortDir', sortDir);
    }
    return this.http.get<Factor[]>
      (this.baseUrl, { observe: 'response', params })
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
  getWalletFactors(walletId: string, page?, itemPerPage?, filter?, sortHe?, sortDir?):
    Observable<PaginationResult<Factor[]>> {
    const paginatedResult: PaginationResult<Factor[]> = new PaginationResult<Factor[]>();
    let params = new HttpParams();

    if (page != null && itemPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemPerPage);
      params = params.append('filter', filter);
      params = params.append('sortHe', sortHe);
      params = params.append('sortDir', sortDir);
    }
    return this.http.get<Factor[]>
      (this.walletFactorsbaseUrl + walletId + '/factors/', { observe: 'response', params })
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
  getGateFactors(gateId: string, page?, itemPerPage?, filter?, sortHe?, sortDir?):
    Observable<PaginationResult<Factor[]>> {
    const paginatedResult: PaginationResult<Factor[]> = new PaginationResult<Factor[]>();
    let params = new HttpParams();

    if (page != null && itemPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemPerPage);
      params = params.append('filter', filter);
      params = params.append('sortHe', sortHe);
      params = params.append('sortDir', sortDir);
    }
    return this.http.get<Factor[]>
      (this.baseGateUrl + 'gates/' + gateId + '/factors/', { observe: 'response', params })
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
  getFactor(factorId: string): Observable<Factor> {
    return this.http.get<Factor>(this.baseUrl + factorId);
  }
  changeStatusFactor(factorId: string, status: boolean): Observable<Wallet> {
    return this.http.patch<Wallet>(this.baseUrl + factorId + '/status', { status });
  }
  updateFactor(factorId: string, data: any) {
    return this.http.patch(this.baseUrl + factorId + '/edit', data);
  }
}
