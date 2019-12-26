import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginationResult } from 'src/app/data/models/common/paginationResult';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Entry } from 'src/app/data/models/accountant/entry';
import { EntryForUpdate } from 'src/app/data/models/accountant/entryForUpdate';

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  baseUrl = environment.apiUrl + environment.apiV1 + 'site/panel/entries/';

  constructor(private http: HttpClient) { }

  getEntriesApprove(page?, itemPerPage?, filter?, sortHe?, sortDir?):
    Observable<PaginationResult<Entry[]>> {
    const paginatedResult: PaginationResult<Entry[]> = new PaginationResult<Entry[]>();
    let params = new HttpParams();

    if (page != null && itemPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemPerPage);
      params = params.append('filter', filter);
      params = params.append('sortHe', sortHe);
      params = params.append('sortDir', sortDir);
    }
    return this.http.get<Entry[]>
      (this.baseUrl + 'approve', { observe: 'response', params })
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
  getEntriesPardakht(page?, itemPerPage?, filter?, sortHe?, sortDir?):
    Observable<PaginationResult<Entry[]>> {
    const paginatedResult: PaginationResult<Entry[]> = new PaginationResult<Entry[]>();
    let params = new HttpParams();

    if (page != null && itemPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemPerPage);
      params = params.append('filter', filter);
      params = params.append('sortHe', sortHe);
      params = params.append('sortDir', sortDir);
    }
    return this.http.get<Entry[]>
      (this.baseUrl + 'pardakht', { observe: 'response', params })
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
  getEntriesArchive(page?, itemPerPage?, filter?, sortHe?, sortDir?):
    Observable<PaginationResult<Entry[]>> {
    const paginatedResult: PaginationResult<Entry[]> = new PaginationResult<Entry[]>();
    let params = new HttpParams();

    if (page != null && itemPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemPerPage);
      params = params.append('filter', filter);
      params = params.append('sortHe', sortHe);
      params = params.append('sortDir', sortDir);
    }
    return this.http.get<Entry[]>
      (this.baseUrl + 'archive', { observe: 'response', params })
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
  getBankCardEntries(bankcardId: string,page?, itemPerPage?, filter?, sortHe?, sortDir?):
    Observable<PaginationResult<Entry[]>> {
    const paginatedResult: PaginationResult<Entry[]> = new PaginationResult<Entry[]>();
    let params = new HttpParams();

    if (page != null && itemPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemPerPage);
      params = params.append('filter', filter);
      params = params.append('sortHe', sortHe);
      params = params.append('sortDir', sortDir);
    }
    return this.http.get<Entry[]>
      (this.baseUrl + 'archive', { observe: 'response', params })
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
  getEntry(entryId: string): Observable<Entry> {
    return this.http.get<Entry>(this.baseUrl + entryId );
  }
  changeApproveEntry(entryId: string, isApprove: boolean) {
    return this.http.patch(this.baseUrl + entryId + '/approve', { isApprove });
  }
  changePardakhtEntry(entryId: string, isPardakht: boolean) {
    return this.http.patch(this.baseUrl + entryId + '/pardakht', { isPardakht });
  }
  changeRejectEntry(entryId: string, isReject: boolean) {
    return this.http.patch(this.baseUrl + entryId + '/reject', { isReject });
  }
  updateEntry(entryId: string, entry: any) {
    return this.http.patch(this.baseUrl + entryId + '/update', entry);
  }

}
