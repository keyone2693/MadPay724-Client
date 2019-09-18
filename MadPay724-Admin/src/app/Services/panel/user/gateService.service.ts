import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Gate } from 'src/app/models/user/gate';
import { GatesWallets } from 'src/app/models/user/gatesWallets';
import { GateWallets } from 'src/app/models/user/gateWallets';

@Injectable({
  providedIn: 'root'
})
export class GatesService {
  baseUrl = environment.apiUrl + environment.apiV1 + 'site/panel/';
  constructor(private http: HttpClient, private formBuilder: FormBuilder) { }
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

  getGates(id: string): Observable<GatesWallets> {
    return this.http.get<GatesWallets>(this.baseUrl + 'users/' + id + '/gates');
  }
  getGate(id: string, gateId: Gate): Observable<GateWallets> {
    return this.http.get<GateWallets>(this.baseUrl + 'users/' + id + '/gates/' + gateId);
  }

  addGate(gate: any, id: string): Observable<Gate> {
    return this.http.post<Gate>(this.baseUrl + 'users/' + id + '/gates', gate);
  }

  updateGate(gate: any, userId: string, id: string) {
    return this.http.put(this.baseUrl + 'users/' + userId + '/gates/' + id, gate);
  }

  populateForm(gate: Gate) {
    this.gateForm.setValue(gate);
  }

  activeGate(active: any, userId: string, gateId: string) {
    return this.http.put(this.baseUrl + 'users/' + userId + '/gates/' + gateId + '/active/', active);
  }

}
