import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Gate } from 'src/app/models/user/gate';

@Injectable({
  providedIn: 'root'
})
export class GatesService {
  baseUrl = environment.apiUrl + environment.apiV1 + 'site/panel/';
  constructor(private http: HttpClient, private formBuilder: FormBuilder) { }
  gateForm: FormGroup = this.formBuilder.group({
    id: [],
    walletId: ['', [Validators.required]],
    isIp: [false, [Validators.required]],
    websiteName: ['', [Validators.required, Validators.maxLength(100)]],
    websiteUrl: ['', [Validators.required, Validators.maxLength(500)]],
    phoneNumber: ['', [Validators.required, Validators.maxLength(50)]],
    text: ['', [Validators.required, Validators.maxLength(1000)]],
    grouping: ['', [Validators.required, Validators.maxLength(50)]]
  });

  getGates(id: string): Observable<Gate[]> {
    return this.http.get<Gate[]>(this.baseUrl + 'users/' + id + '/gates');
  }
  getGate( id: string, gateId: Gate): Observable<Gate> {
    return this.http.get<Gate>(this.baseUrl + 'users/' + id + '/gates/' + gateId);
  }

  addGate(gate: Gate, id: string): Observable<Gate> {
    return this.http.post<Gate>(this.baseUrl + 'users/' + id + '/gates', gate);
  }

  updateGate(gate: Gate, id: string) {
    return this.http.put(this.baseUrl + 'users/' + id + '/gates/' + gate.id, gate);
  }

  populateForm(gate: Gate) {
    this.gateForm.setValue(gate);
  }

}
