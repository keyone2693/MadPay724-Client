import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GatesWallets } from 'src/app/data/models/user/gatesWallets';
import { GateWallets } from 'src/app/data/models/user/gateWallets';
import { Gate } from 'src/app/data/models/user/gate';
import { Store } from '@ngrx/store';

import * as fromStore from '../../../../store';

@Injectable({
  providedIn: 'root'
})
export class GatesService {
  baseUrl = environment.apiUrl + environment.apiV1 + 'site/panel/';
  userId: string;
  constructor(private http: HttpClient, private formBuilder: FormBuilder,
    private store: Store<fromStore.State>) {
    this.store.select(fromStore.getUserId).subscribe(data => {
      this.userId = data;
    });  }
  gateForm: FormGroup = this.formBuilder.group({
    walletId: ['', [Validators.required]],
    isIp: [false, [Validators.required]],
    websiteName: ['', [Validators.required, Validators.maxLength(100)]],
    websiteUrl: ['', [Validators.required, Validators.maxLength(500),
      Validators.pattern('(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})')]],
    phoneNumber: ['', [Validators.required, Validators.maxLength(50)]],
    text: ['', [Validators.required, Validators.maxLength(1000)]],
    grouping: ['', [Validators.required, Validators.maxLength(50)]],
    file: [null, [Validators.required]],
  });

  getGates(userId: string = this.userId): Observable<GatesWallets> {
    return this.http.get<GatesWallets>(this.baseUrl + 'users/' + userId + '/gates');
  }
  getGate(gateId: Gate, userId: string = this.userId): Observable<GateWallets> {
    return this.http.get<GateWallets>(this.baseUrl + 'users/' + userId + '/gates/' + gateId);
  }

  addGate(gate: any, userId: string = this.userId): Observable<Gate> {
    return this.http.post<Gate>(this.baseUrl + 'users/' + userId + '/gates', gate);
  }

  updateGate(gate: any, gateId: string, userId: string = this.userId) {
    return this.http.put(this.baseUrl + 'users/' + userId + '/gates/' + gateId, gate);
  }
  
  activeGate(active: any, gateId: string, userId: string = this.userId) {
    return this.http.put(this.baseUrl + 'users/' + userId + '/gates/' + gateId + '/active', active);
  }
  populateForm(gate: Gate) {
    this.gateForm.setValue(gate);
  }
}
