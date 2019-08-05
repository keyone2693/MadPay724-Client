import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BankCard } from 'src/app/models/bankcard';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BankCardsService {
  baseUrl = environment.apiUrl + environment.apiV1 + 'site/panel/';
  constructor(private http: HttpClient, private formBuilder: FormBuilder) { }
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

  getBankCards(id: string): Observable<BankCard[]> {
    return this.http.get<BankCard[]>(this.baseUrl + 'users/' + id + '/bankcards');
  }

  addBankCard(bankCard: BankCard, id: string): Observable<BankCard> {
    return this.http.post<BankCard>(this.baseUrl + 'users/' + id + '/bankcards', bankCard);
  }

  updateBankCard(bankCard: BankCard) {
    return this.http.put(this.baseUrl + 'bankcards/' + bankCard.id, bankCard);
  }

  deleteBankCard(id: string) {
    return this.http.delete(this.baseUrl + 'bankcards/' + id);
  }

  populateForm(bankCard: BankCard) {
    this.bankcardForm.setValue(bankCard);
    }
}
