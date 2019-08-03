import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BankCard } from 'src/app/models/bankcard';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BankCardService {

baseUrl = environment.apiUrl + environment.apiV1 + 'site/panel/';
constructor(private http: HttpClient) { }

getBankCards(id: string): Observable<BankCard[]> {
  return this.http.get<BankCard[]>(this.baseUrl + 'users/' + id + '/bankcards');
}

}
