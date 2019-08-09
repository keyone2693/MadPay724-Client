import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Wallet } from 'src/app/models/wallet';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  baseUrl = environment.apiUrl + environment.apiV1 + 'site/panel/';
  constructor(private http: HttpClient, private formBuilder: FormBuilder) { }
  walletForm: FormGroup = this.formBuilder.group({
    id: [],
    approve: []
  });

  getWallets(id: string): Observable<Wallet[]> {
    return this.http.get<Wallet[]>(this.baseUrl + 'users/' + id + '/wallets');
  }

  addWallet(wallet: Wallet, id: string): Observable<Wallet> {
    return this.http.post<Wallet>(this.baseUrl + 'users/' + id + '/wallets', wallet);
  }

  updateWallet(wallet: Wallet) {
    return this.http.put(this.baseUrl + 'wallets/' + wallet.id, wallet);
  }

  deleteWallet(id: string) {
    return this.http.delete(this.baseUrl + 'wallets/' + id);
  }

  populateForm(wallet: Wallet) {
    this.walletForm.setValue(wallet);
    }

}
