import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl + 'site/admin/users/';


constructor(private http: HttpClient) { }

getUsers(): Observable<User[]> {
  return this.http.get<User[]>(this.baseUrl);
}

getUser(id: string): Observable<User> {
  return this.http.get<User>(this.baseUrl + id);
}

updateUserInfo(id: string, user: User) {
  return this.http.put(this.baseUrl + id, user);
}
}
