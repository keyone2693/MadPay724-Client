import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Gate } from 'src/app/data/models/user/gate';


@Injectable({
  providedIn: 'root'
})
export class GatesService {
  baseUrl = environment.apiUrl + environment.apiV1 + 'site/panel/admin/';
  constructor(private http: HttpClient) {
  }
  getUserGates(userId: string):Observable<Gate[]> {
    return this.http.get<Gate[]>(this.baseUrl + 'users/' + userId + '/gates');
  }

  changeActiveGate(gateId: string, flag: any) {
    return this.http.patch(this.baseUrl + 'gates/' + gateId + '/activegate', {flag});
  }
  changeDirectGate(gateId: string, flag: any) {
    return this.http.patch(this.baseUrl + 'gates/' + gateId + '/directgate', {flag});
  }
  changeIpGate(gateId: string, flag: any) {
    return this.http.patch(this.baseUrl + 'gates/' + gateId + '/ipgate',{flag});
  }
}
