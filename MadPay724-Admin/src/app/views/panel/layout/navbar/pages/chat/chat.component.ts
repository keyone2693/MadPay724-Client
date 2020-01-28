import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserInfo } from 'src/app/data/models/common/chat/userInfo';
import { DirectMessage } from 'src/app/data/models/common/chat/directMessage';
import { Observable, Subscription } from 'rxjs';

import * as fromStore from 'src/app/store';
import { Store } from '@ngrx/store';
import { DirectMessageStateModel } from 'src/app/store/_model/directMessageStateModel';
import { AuthService } from 'src/app/core/_services/auth/auth.service';
import { DirectMessageStateContainer } from 'src/app/store/_model/directMessageStateContainer';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  url = '../../../../../assets/js/notification-sidebar.js';
  loadAPI: any;
  subManager = new Subscription();
  //*********** 
  onlineUsers: UserInfo[];
  onlineUser: UserInfo;
  directMessages: DirectMessage;
  selectedOnlineUserName = '';
  dmState$: Observable<DirectMessageStateContainer>;
  connected: boolean;
  message = '';
  //***********
  constructor(private authService: AuthService, private store: Store<fromStore.State>) {
    if (this.authService.roleMatch(['Admin'])) {
      this.selectedOnlineUserName = 'keyvan@madpay.com';

    } else if (this.authService.roleMatch(['User'])) {
      this.selectedOnlineUserName = 'admin@madpay724.com';
    }
    this.dmState$ = this.store.select<DirectMessageStateContainer>(state => state.directMessage.dm);
    this.subManager.add(
      this.store.select<DirectMessageStateModel>(state => state.directMessage).subscribe(data => {
        this.connected = data.dm.connected;
      })
    );
  }
  ngOnInit() {
    this.loadAPI = new Promise(resolve => {
      this.loadScript();
    });
  }
  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
  public loadScript() {
    const node = document.createElement('script');
    node.src = this.url;
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  connect() {
    this.store.dispatch(new fromStore.Join());
  }
  sendMessage() {
    this.store.dispatch(new fromStore.SendDirectMessage(this.message, this.selectedOnlineUserName))
  }
  selectChat(onlineUserName: string) {
    this.selectedOnlineUserName = onlineUserName;
  }
  getUserInfoName(directMessage: DirectMessage) {
    if (directMessage.fromOnlineUser) {
      return directMessage.fromOnlineUser.userName;
    }
    return '';
  }
  isAdmin(directMessage: DirectMessage) {
    if (directMessage.fromOnlineUser) {
      return true
    }
    return false;
  }
  disConnect() {
    this.store.dispatch(new fromStore.Leave());
  }
}
