import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

constructor() { }

  encrypt(data: any): string {
    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), environment.encryptSecretKey).toString();
    } catch (e) {
      console.log(e);
    }
  }
  decrypt(data: any): any {
    try {
      const decBytes = CryptoJS.AES.decrypt(data, environment.encryptSecretKey);
      if (decBytes.toString()) {
        return JSON.parse(decBytes.toString(CryptoJS.enc.Utf8));
      }
    } catch (e) {
      console.log(e);
    }
  }
  
}
