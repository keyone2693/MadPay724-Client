import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GatesWallets } from 'src/app/data/models/user/gatesWallets';
import { GateWallets } from 'src/app/data/models/user/gateWallets';
import { Gate } from 'src/app/data/models/user/gate';
import { Store } from '@ngrx/store';

import * as fromStore from '../../../../store';
import { PaginationResult } from 'src/app/data/models/common/paginationResult';
import { map } from 'rxjs/operators';
import { Factor } from 'src/app/data/models/accountant/factor';

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
