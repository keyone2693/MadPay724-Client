import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { EasyPay } from 'src/app/models/user/easyPay';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EasyPayService {
  baseUrl = environment.apiUrl + environment.apiV1 + 'site/panel/';
  constructor(private http: HttpClient, private formBuilder: FormBuilder) { }

 easypayForm: FormGroup = this.formBuilder.group({
   walletId: ['', Validators.required],
   gateId: ['', Validators.required],
   name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
   price: ['', Validators.required, Validators.maxLength(15)],
   text: ['', Validators.required, Validators.maxLength(250)],
   isCoupon: [false, Validators.required],
   isUserEmail: [false, Validators.required],
   isUserName: [false, Validators.required],
   isUserPhone: [false, Validators.required],
   isUserText: [false, Validators.required],
   isUserEmailRequired: [false, Validators.required],
   isUserNameRequired: [false, Validators.required],
   isUserPhoneRequired: [false, Validators.required],
   isUserTextRequired: [false, Validators.required],
   userEmailExplain: ['ایمیل', Validators.required, Validators.maxLength(25)],
   userNameExplain: ['نام', Validators.required, Validators.maxLength(25)],
   userPhoneExplain: ['شماره تماس', Validators.required, Validators.maxLength(25)],
   userTextExplain: ['توضیحات', Validators.required, Validators.maxLength(25)],
   isCountLimit: [false, Validators.required],
   countLimit: [0, Validators.required],
   returnSuccess: ['', Validators.required],
   returnFail: ['', Validators.required],
 });
  getEasyPays(id: string): Observable<EasyPay[]> {
    return this.http.get<EasyPay[]>(this.baseUrl + 'users/' + id + '/easypays');
  }
  getEasyPay(id: string, gateId: EasyPay): Observable<EasyPay> {
    return this.http.get<EasyPay>(this.baseUrl + 'users/' + id + '/easypays/' + gateId);
  }

  addEasyPay(gate: any, id: string): Observable<EasyPay> {
    return this.http.post<EasyPay>(this.baseUrl + 'users/' + id + '/easypays', gate);
  }

  updateEasyPay(gate: any, userId: string, id: string) {
    return this.http.put(this.baseUrl + 'users/' + userId + '/easypays/' + id, gate);
  }

  populateForm(gate: EasyPay) {
    this.easypayForm.setValue(gate);
  }

}
