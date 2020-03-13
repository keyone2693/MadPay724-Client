import { Component, OnInit, OnDestroy } from '@angular/core';

import * as fromStore from 'src/app/store';
import { Store } from '@ngrx/store';
import { DirectMessageStateModel } from 'src/app/store/_model/directMessageStateModel';
import { AuthService } from 'src/app/core/_services/auth/auth.service';
import { DirectMessageStateContainer } from 'src/app/store/_model/directMessageStateContainer';
import { Subscription, Observable } from 'rxjs';
import { UserInfo } from 'src/app/data/models/common/chat/userInfo';
import { DirectMessage } from 'src/app/data/models/common/chat/directMessage';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { CryptoService } from 'src/app/core/_services/common/crypto.service';
import { MessageSettings } from 'src/app/data/models/common/chat/messageSettings';
import { DirectMessageSaveService } from 'src/app/core/_services/common/directMessageSave.service';
import { DirectMessageService } from 'src/app/core/_services/common/directMessage.service';

@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.css']
})
export class UserChatComponent implements OnInit, OnDestroy {
  subManager = new Subscription();
  //*********** 
  onlineUsers$: Observable<UserInfo[]>;
  onlineUser: UserInfo;
  directMessages: DirectMessage;
  selectedOnlineUserName = '';
  dmState$: Observable<DirectMessageStateContainer>;
  connected: boolean;
  isAdminShownMess = false;
  message = '';
  messageSettings: MessageSettings;

  //***********
  constructor(private authService: AuthService, private alertService: ToastrService,
    private store: Store<fromStore.State>, private cookieService: CookieService,
    private cryptoService: CryptoService, private dmSaveService: DirectMessageSaveService,
    private dmService: DirectMessageService) {
    
    

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
    this.selectedOnlineUserName = 'admin@madpay724.com';
    this.messageSettings = this.dmSaveService.loadMessageSettings();
  }

  changeMessageSettings() {
    this.dmSaveService.changeMessageSettings(this.messageSettings);
    this.alertService.success('تنظیمات اطلاع رسانی چت با موفقیت تغییر کرد', 'موفق');
  }
  ngOnDestroy() {
    this.subManager.unsubscribe();
  }

  connect() {
      this.store.dispatch(new fromStore.Join());
  }
  sendMessage() {
    if (this.isAdminOnline()) {
      this.store.dispatch(new fromStore.SendDirectMessage(this.message, this.selectedOnlineUserName))
    } else {
      this.alertService.warning('امکان چت انلاین وجود ندارد ', 'پشتیبان آفلاین میباشد');
    }
  }
  getUserInfoName(directMessage: DirectMessage) {
    if (directMessage.fromOnlineUser.connectionId != '-1') {
      return directMessage.fromOnlineUser.userName;
    }
    return '';
  }
  isAdmin(directMessage: DirectMessage) {
    if (directMessage.fromOnlineUser.connectionId != '-1') {
      return true
    }
    return false;
  }
  isAdminOnline(): boolean {
    let onlineUsers = [];
    this.subManager.add(
      this.onlineUsers$.subscribe(data => {
        onlineUsers = data;
      })
    );
    if (onlineUsers.some(el => el.userName === 'admin@madpay724.com')) {
      if (this.dmSaveService.isActiveConnect()) {
        if (!this.isAdminShownMess) {
          this.alertService.success('میتوانید با پشتیبان گفت و گو کنید', 'پشتیبان آنلاین میباشد');
          this.isAdminShownMess = true;
        }
      }
      return true;
    } else {
      if (this.dmSaveService.isActiveConnect()) {
        if (this.isAdminShownMess) {
          this.alertService.warning('امکان چت انلاین وجود ندارد ', 'پشتیبان آفلاین میباشد');
          this.isAdminShownMess = false;
        }
      }

      return false;
    }
  }
  disConnect() {
    this.store.dispatch(new fromStore.Leave());
  }

}
