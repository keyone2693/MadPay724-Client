import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Store } from '@ngrx/store';

import * as fromStore from '../../../../store';
@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  baseUrl = environment.apiUrl + environment.apiV1 + 'site/panel/';
  userId: string;
  constructor(private http: HttpClient, private store: Store<fromStore.State>) {
    this.store.select(fromStore.getUserId).subscribe(data => {
      this.userId = data;
    });
   }

  getDocuments(userId: string = this.userId): Observable<Document[]> {
    return this.http.get<Document[]>(this.baseUrl + 'users/' + userId + '/documents');
  }

  addDocument(document: any,userId: string = this.userId): Observable<Document> {
    return this.http.post<Document>(this.baseUrl + 'users/' + userId + '/documents', document);
  }
}
