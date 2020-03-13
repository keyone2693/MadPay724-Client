import { Injectable } from '@angular/core';
import { CryptoService } from 'src/app/core/_services/common/crypto.service';
import { MessageSettings } from 'src/app/data/models/common/chat/messageSettings';
import { DirectMessageSave } from 'src/app/data/models/common/chat/directMessageSave';
import { DirectMessage } from 'src/app/data/models/common/chat/directMessage';
import { environment } from 'src/environments/environment.prod';



@Injectable({
  providedIn: 'root'
})
export class DirectMessageSaveService {

  constructor(private cryptoService: CryptoService) { }

  loadMessages(): DirectMessageSave {
    if (localStorage.getItem('dm') == null) {
        const dm: DirectMessageSave = {
        directMessages: []
      }
      const encvalue = this.cryptoService.encrypt(dm);
      localStorage.setItem('dm', encvalue);
    }
    const value = localStorage.getItem('dm');
    const decValue: DirectMessageSave | undefined | null = this.cryptoService.decrypt(value);
    if (decValue != undefined && decValue != null) {
      const newdm: DirectMessageSave = { directMessages: [] }
      //
      decValue.directMessages.forEach(el => {
        const nowdt = new Date();
        const eldt = new Date(el.date);

        const hours = Math.abs(nowdt.getTime() - eldt.getTime()) / 36e5;

        if (hours < environment.expireHour) {
          newdm.directMessages.push(el);
        }
      });
      //
      localStorage.removeItem('dm');
      const encvalue = this.cryptoService.encrypt(newdm);
      localStorage.setItem('dm', encvalue);
      //
      return newdm;
    } else {
      return { directMessages: [] };
    }
  }
  addToMessages(dMessage: DirectMessage) {
    if (localStorage.getItem('dm') == null) {
      const dm: DirectMessageSave = {
        directMessages: [dMessage]
      }
      const encvalue = this.cryptoService.encrypt(dm);
      localStorage.setItem('dm', encvalue);
    } else {
      const value = localStorage.getItem('dm');
      const decValue: DirectMessageSave = this.cryptoService.decrypt(value);
      decValue.directMessages.push(dMessage);
      const encvalue = this.cryptoService.encrypt(decValue);
      localStorage.removeItem('dm');
      localStorage.setItem('dm', encvalue);
    }
  }

  loadMessageSettings(): MessageSettings {
    if (localStorage.getItem('dms') == null) {
      const dmSettings: MessageSettings = {
        activeMessage: true,
        activeConnect: true
      }
      const encvalue = this.cryptoService.encrypt(dmSettings);
      localStorage.setItem('dms', encvalue);
    }
    const value = localStorage.getItem('dms');
    return this.cryptoService.decrypt(value);
  }
  changeMessageSettings(messageSettings: MessageSettings) {
    localStorage.removeItem('dms');
    const encvalue = this.cryptoService.encrypt(messageSettings);
    localStorage.setItem('dms', encvalue);
  }

  isActiveMessage(): boolean {
    if (localStorage.getItem('dms') == null) {
      this.loadMessageSettings();
    }
    const value = localStorage.getItem('dms');
    return (this.cryptoService.decrypt(value)).activeMessage;
  }
  isActiveConnect(): boolean {
    if (localStorage.getItem('dms') == null) {
      this.loadMessageSettings();
    }
    const value = localStorage.getItem('dms');
    return (this.cryptoService.decrypt(value)).activeConnect;
  }
}
