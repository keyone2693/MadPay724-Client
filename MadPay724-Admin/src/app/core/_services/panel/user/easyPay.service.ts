import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { EasyPay } from 'src/app/data/models/user/easyPay';
import { EasyPayGatesWallets } from 'src/app/data/models/user/easyPayGatesWallets';
import { Store } from '@ngrx/store';

import * as fromStore from '../../../../store';

@Injectable({
  providedIn: 'root'
})
export class EasyPayService {
  baseUrl = environment.apiUrl + environment.apiV1 + 'site/panel/';
  userId: string;

  constructor(private http: HttpClient, private formBuilder: FormBuilder,
    private store: Store<fromStore.State>) {
    this.store.select(fromStore.getUserId).subscribe(data => {
      this.userId = data;
    });
  }

 easypayForm: FormGroup = this.formBuilder.group({
   id: [],
   walletGateId: ['', [Validators.required]],
   isWallet: [true, [Validators.required]],
   name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
   price: [0, [Validators.required, Validators.maxLength(15)]],
   text: ['', [Validators.required, Validators.maxLength(250)]],
   isCoupon: [false, [Validators.required]],
   isUserEmail: [true, [Validators.required]],
   isUserName: [true, [Validators.required]],
   isUserPhone: [true, [Validators.required]],
   isUserText: [true, [Validators.required]],
   isUserEmailRequired: [false, [Validators.required]],
   isUserNameRequired: [false, [Validators.required]],
   isUserPhoneRequired: [false, [Validators.required]],
   isUserTextRequired: [false, [Validators.required]],
   userEmailExplain: ['ایمیل', [Validators.maxLength(25)]],
   userNameExplain: ['نام', [Validators.maxLength(25)]],
   userPhoneExplain: ['شماره تماس', [Validators.maxLength(25)]],
   userTextExplain: ['توضیحات', [Validators.maxLength(25)]],
   isCountLimit: [false, [Validators.required]],
   countLimit: [0],
   returnSuccess: ['',
     Validators.pattern('(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})')],
   returnFail: ['',
     Validators.pattern('(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})')],
 });
  getEasyPays(userId: string = this.userId): Observable<EasyPay[]> {
    return this.http.get<EasyPay[]>(this.baseUrl + 'users/' + userId + '/easypays');
  }
  getEasyPay(easypayId: string, userId: string = this.userId): Observable<EasyPay> {
    return this.http.get<EasyPay>(this.baseUrl + 'users/' + userId + '/easypays/' + easypayId);
  }
  getEasyPayGatesWallets(easypayId: string, userId: string = this.userId): Observable<EasyPayGatesWallets> {
    return this.http.get<EasyPayGatesWallets>(this.baseUrl + 'users/' + userId + '/easypays/' + easypayId + '/gateswallets');
  }
  addEasyPay(easypay: any,userId: string = this.userId): Observable<EasyPay> {
    return this.http.post<EasyPay>(this.baseUrl + 'users/' + userId + '/easypays', easypay);
  }

  updateEasyPay(easypay: any, id: string, userId: string = this.userId) {
    return this.http.put(this.baseUrl + 'users/' + userId + '/easypays/' + id, easypay);
  }

  populateForm(easypay: EasyPay) {
    this.easypayForm.setValue(easypay);
  }
  deleteEasyPay(easypayId: string, userId: string = this.userId) {
    return this.http.delete(this.baseUrl + 'users/' + userId + '/easypays/' + easypayId);
  }

}
