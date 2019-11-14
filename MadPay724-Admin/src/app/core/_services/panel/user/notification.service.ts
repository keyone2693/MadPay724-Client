import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Notify } from 'src/app/data/models/notify';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  baseUrl = environment.apiUrl + environment.apiV1 + 'site/panel/';
constructor(private http: HttpClient) { }

getNotify(id: string): Observable<Notify> {
  return this.http.get<Notify>(this.baseUrl + 'notifications/' + id);
}

updateNotify(id: string, notify: Notify) {
  return this.http.put(this.baseUrl + 'users/' + id + '/notifications', notify);
}

}
