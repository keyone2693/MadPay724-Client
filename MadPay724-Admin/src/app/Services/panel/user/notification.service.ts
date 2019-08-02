import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Notify } from 'src/app/models/notify';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  baseUrl = environment.apiUrl + environment.apiV1 + 'site/panel/notifications/';
constructor(private http: HttpClient) { }

getNotify(id: string): Observable<Notify> {
  return this.http.get<Notify>(this.baseUrl + id);
}

}
