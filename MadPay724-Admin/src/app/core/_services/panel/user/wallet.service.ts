import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Wallet } from 'src/app/data/models/wallet';
import { Store } from '@ngrx/store';

import * as fromStore from '../../../../store';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  baseUrl = environment.apiUrl + environment.apiV1 + 'site/panel/';
  userId: string;
  constructor(private http: HttpClient, private formBuilder: FormBuilder, private store: Store<fromStore.State>) {
    this.store.select(fromStore.getUserId).subscribe(data => {
      this.userId = data;
    });  }
  walletForm: FormGroup = this.formBuilder.group({
    walletId: ['', Validators.required],
    walletName: ['', [Validators.required, Validators.maxLength(20)]]
  });

  getWallets(userId: string = this.userId): Observable<Wallet[]> {
    return this.http.get<Wallet[]>(this.baseUrl + 'users/' + userId + '/wallets');
  }

  addWallet(wallet: any, userId: string = this.userId): Observable<Wallet> {
    return this.http.post<Wallet>(this.baseUrl + 'users/' + userId + '/wallets', wallet);
  }

}
