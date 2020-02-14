import { Component, OnInit, OnDestroy } from '@angular/core';

import * as fromStore from 'src/app/store';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/core/_services/auth/auth.service';
import { DirectMessageStateContainer } from 'src/app/store/_model/directMessageStateContainer';
import { Subscription, Observable } from 'rxjs';
import { UserInfo } from 'src/app/data/models/common/chat/userInfo';
import { MessageSettings } from 'src/app/data/models/common/chat/messageSettings';
import { DirectMessage } from 'src/app/data/models/common/chat/directMessage';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { CryptoService } from 'src/app/core/_services/common/crypto.service';



@Component({
  selector: 'app-admin-chat',
  templateUrl: './admin-chat.component.html',
  styleUrls: ['./admin-chat.component.css']
})
export class AdminChatComponent implements OnInit, OnDestroy {

  subManager = new Subscription();
  //*********** 
  onlineUsers$: Observable<UserInfo[]>;
  onlineUser: UserInfo;
  directMessages: DirectMessage;
  selectedOnlineUserName = '';
  dmState$: Observable<DirectMessageStateContainer>;
  connected: boolean;
  message = '';
  messageSettings: MessageSettings;
  //***********
  constructor(private authService: AuthService, private alertService: ToastrService,
    private store: Store<fromStore.State>, private cookieService: CookieService,
    private cryptoService: CryptoService) {

    this.onlineUsers$ = this.store.select(fromStore.getOnlineUsers);
    this.dmState$ = this.store.select(fromStore.getDirectMessageStateContainer);
    this.subManager.add(
      this.store.select(fromStore.getConnected).subscribe(data => {
        this.connected = data;
      })
    );

    this.connect();

  }
  ngOnInit() {
    this.loadMessageSettings();
  }
  loadMessageSettings() {
    if (!this.cookieService.check('dms')) {
      const dmSettings: MessageSettings = {
        activeMessage: true,
        activeConnect: true
      }
      const encvalue = this.cryptoService.encrypt(dmSettings);

      this.cookieService.set('dms', encvalue, 365, '/');
    }
    const value = this.cookieService.get('dms');
    this.messageSettings = this.cryptoService.decrypt(value);
  }
  changeMessageSettings() {
    this.cookieService.delete('dms', '/');

    const encvalue = this.cryptoService.encrypt(this.messageSettings);
    this.cookieService.set('dms', encvalue, 365, '/');
    this.alertService.success('تنظیمات اطلاع رسانی چت با موفقیت تغییر کرد', 'موفق');
  }
  ngOnDestroy() {
    this.subManager.unsubscribe();
  }

  connect() {
    this.store.dispatch(new fromStore.Join());
  }
  sendMessage() {
    if (this.selectedOnlineUserName !== '') {
      this.store.dispatch(new fromStore.SendDirectMessage(this.message, this.selectedOnlineUserName))
    }
    else {
      this.alertService.warning('کاربری انتخاب نشده است', 'ناموفق')
    }
  }
  selectChat(onlineUserName: string) {
    this.selectedOnlineUserName = onlineUserName;
  }
  isAnyUserOnline(onlineUsers: UserInfo[]): boolean {
    if (onlineUsers.some(el => el.userName !== 'admin@madpay724.com')) {
      return true;
    }
    return false;
  }
  getUserInfoName(directMessage: DirectMessage) {
    if (directMessage.fromOnlineUser.connectionId != '-1') {
      return directMessage.fromOnlineUser.userName;
    }
    return '';
  }
  isUser(directMessage: DirectMessage) {
    if (directMessage.fromOnlineUser.connectionId != '-1') {
      return true
    }
    return false;
  }
  backToUserList() {
    this.selectedOnlineUserName = '';
  }
  GetUserMess(directMessages: DirectMessage[]): DirectMessage[] {
    return directMessages.filter(p => p.fromOnlineUser.userName === this.selectedOnlineUserName)
  }

}