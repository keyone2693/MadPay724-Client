import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Store } from '@ngrx/store';

import * as fromStore from '../../../../store';
import { PaginationResult } from 'src/app/data/models/common/paginationResult';
import { map } from 'rxjs/operators';
import { Document } from 'src/app/data/models/document';
@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  baseUrl = environment.apiUrl + environment.apiV1 + 'site/panel/admin/';
  userId: string;
  constructor(private http: HttpClient, private store: Store<fromStore.State>) {
    this.store.select(fromStore.getUserId).subscribe(data => {
      this.userId = data;
    });
   }

  getDocuments(page?, itemPerPage?, filter?, sortHe?, sortDir?, userId: string = this.userId): Observable<PaginationResult<Document[]>> {
    const paginatedResult: PaginationResult<Document[]> = new PaginationResult<Document[]>();
    let params = new HttpParams();

    if (page != null && itemPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemPerPage);
      params = params.append('filter', filter);
      params = params.append('sortHe', sortHe);
      params = params.append('sortDir', sortDir);
    }
    return this.http.get<Document[]>
      (this.baseUrl + "documents", { observe: 'response', params })
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
  getDocument(docId: string): Observable<Document> {
    return this.http.get<Document>(this.baseUrl + 'documents/' + docId);
  }

  changeDocumentStatus(docId: string,status: number) {
    return this.http.patch(this.baseUrl + 'documents/' + docId + '/statuschange', { status });
  }
}
