import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CryptoService } from 'src/app/core/_services/common/crypto.service';
import { MessageSettings } from 'src/app/data/models/common/chat/messageSettings';



@Injectable({
  providedIn: 'root'
})
export class DirectMessageSaveService {

  constructor(private cookieService: CookieService,
    private cryptoService: CryptoService) { }
  loadMessageSettings(): MessageSettings {
    if (!this.cookieService.check('dms')) {
      const dmSettings: MessageSettings = {
        activeMessage: true,
        activeConnect: true
      }
      const encvalue = this.cryptoService.encrypt(dmSettings);

      this.cookieService.set('dms', encvalue, 365, '/');
    }
    const value = this.cookieService.get('dms');
    return this.cryptoService.decrypt(value);
  }
  changeMessageSettings(messageSettings: MessageSettings) {
    this.cookieService.delete('dms', '/');

    const encvalue = this.cryptoService.encrypt(messageSettings);
    this.cookieService.set('dms', encvalue, 365, '/');
  }

  isActiveMessage():boolean {
    if (!this.cookieService.check('dms')) {
      this.loadMessageSettings();
    }
    const value = this.cookieService.get('dms');

    return (this.cryptoService.decrypt(value)).activeMessage;
  }
  isActiveConnect(): boolean {
    if (!this.cookieService.check('dms')) {
      this.loadMessageSettings();
    }
    const value = this.cookieService.get('dms');

    return (this.cryptoService.decrypt(value)).activeConnect;
  }
}
