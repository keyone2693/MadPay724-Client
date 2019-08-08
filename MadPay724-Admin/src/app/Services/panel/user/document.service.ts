import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  baseUrl = environment.apiUrl + environment.apiV1 + 'site/panel/';

  constructor(private http: HttpClient) { }

  getDocuments(id: string): Observable<Document[]> {
    return this.http.get<Document[]>(this.baseUrl + 'users/' + id + '/documents');
  }

  addDocument(id: string, document: any): Observable<Document> {
    return this.http.post<Document>(this.baseUrl + 'users/' + id + '/documents', document);
  }
}
