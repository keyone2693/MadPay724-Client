import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginationResult } from 'src/app/data/models/common/paginationResult';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Factor } from 'src/app/data/models/accountant/factor';

@Injectable({
  providedIn: 'root'
})
export class FactorService {
  baseUrl = environment.apiUrl + environment.apiV1 + 'site/panel/factors/';

  constructor(private http: HttpClient) { }
  getFactors(page?, itemPerPage?, filter?, sortHe?, sortDir?):
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
  getFactor(factorId: string): Observable<Factor> {
    return this.http.get<Factor>(this.baseUrl + factorId);
  }
  changeStatusFactor(factorId: string, status: boolean) {
    return this.http.patch(this.baseUrl + factorId + '/status', { status });
  }
}
