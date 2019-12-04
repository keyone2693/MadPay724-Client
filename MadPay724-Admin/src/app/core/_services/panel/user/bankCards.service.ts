import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BankCard } from 'src/app/data/models/bankcard';
import { Store } from '@ngrx/store';

import * as fromStore from '../../../../store';

@Injectable({
  providedIn: 'root'
})
export class BankCardsService {
  baseUrl = environment.apiUrl + environment.apiV1 + 'site/panel/';
  userId: string;

  constructor(private http: HttpClient, private formBuilder: FormBuilder,
    private store: Store<fromStore.State>) { 
    this.store.select(fromStore.getUserId).subscribe(data => {
      this.userId = data;
    });
   }
  bankcardForm: FormGroup = this.formBuilder.group({
    id: [],
    approve: [],
    bankName: ['', [Validators.required]],
    hesabNumber: [''],
    ownerName: ['', [Validators.required, Validators.maxLength(100)]],
    shaba: [''],
    cardNumber: ['', [Validators.required, Validators.maxLength(20)]],
    expireDateMonth: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
    expireDateYear: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]]
  });

  getBankCards(userId: string = this.userId): Observable<BankCard[]> {
    return this.http.get<BankCard[]>(this.baseUrl + 'users/' + userId + '/bankcards');
  }

  addBankCard(bankCard: BankCard, userId: string = this.userId): Observable<BankCard> {
    return this.http.post<BankCard>(this.baseUrl + 'users/' + userId + '/bankcards', bankCard);
  }

  updateBankCard(bankCard: BankCard, userId: string = this.userId) {
    return this.http.put(this.baseUrl + 'users/' + userId +  '/bankcards/' + bankCard.id, bankCard);
  }

  deleteBankCard(id: string, userId: string = this.userId) {
    return this.http.delete(this.baseUrl + 'users/' + userId +  '/bankcards/' + id);
  }

  populateForm(bankCard: BankCard) {
    this.bankcardForm.setValue(bankCard);
    }
}
