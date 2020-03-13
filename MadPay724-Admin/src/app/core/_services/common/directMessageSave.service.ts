import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CryptoService } from 'src/app/core/_services/common/crypto.service';
import { MessageSettings } from 'src/app/data/models/common/chat/messageSettings';
import { DirectMessageSave } from 'src/app/data/models/common/chat/directMessageSave';
import { DirectMessage } from 'src/app/data/models/common/chat/directMessage';



@Injectable({
  providedIn: 'root'
})
export class DirectMessageSaveService {

  constructor(private cookieService: CookieService,
    private cryptoService: CryptoService) { }

  loadMessages(): DirectMessageSave {
    if (!this.cookieService.check('dm')) {
      const dm: DirectMessageSave = {
        directMessages: []
      }
      const encvalue = this.cryptoService.encrypt(dm);
      this.cookieService.set('dm', encvalue, 365, '/');
      this.cookieService.deleteAll('/');
    }
    const value = this.cookieService.get('dm');
    const decValue = this.cryptoService.decrypt(value);
    if (decValue != undefined && decValue != null) {
      return decValue;
    } else {
      return { directMessages: [] };
    }

  }
  addToMessages(dMessage: DirectMessage) {
    if (!this.cookieService.check('dm')) {
      const dm: DirectMessageSave = {
        directMessages: [dMessage]
      }
      const encvalue = this.cryptoService.encrypt(dm);
      this.cookieService.set('dm', encvalue, 365, '/');
    } else {

      const value = this.cookieService.get('dm');
      const decValue: DirectMessageSave = this.cryptoService.decrypt(value);
      decValue.directMessages.concat(dMessage);
      const encvalue = this.cryptoService.encrypt(decValue);

      this.cookieService.delete('dm', '/');
      this.cookieService.set('dm', encvalue, 365, '/');
    }
  }

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

  isActiveMessage(): boolean {
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
