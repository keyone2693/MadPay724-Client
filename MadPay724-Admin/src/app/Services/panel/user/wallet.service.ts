import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Wallet } from 'src/app/models/wallet';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  baseUrl = environment.apiUrl + environment.apiV1 + 'site/panel/';
  constructor(private http: HttpClient, private formBuilder: FormBuilder) { }
  walletForm: FormGroup = this.formBuilder.group({
    walletId: ['', Validators.required],
    walletName: ['', [Validators.required, Validators.maxLength(20)]]
  });

  getWallets(id: string): Observable<Wallet[]> {
    return this.http.get<Wallet[]>(this.baseUrl + 'users/' + id + '/wallets');
  }

  addWallet(wallet: any, id: string): Observable<Wallet> {
    return this.http.post<Wallet>(this.baseUrl + 'users/' + id + '/wallets', wallet);
  }

}
