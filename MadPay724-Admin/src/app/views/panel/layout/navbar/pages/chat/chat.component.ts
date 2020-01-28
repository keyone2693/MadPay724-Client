import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserInfo } from 'src/app/data/models/common/chat/userInfo';
import { DirectMessage } from 'src/app/data/models/common/chat/directMessage';
import { Observable, Subscription } from 'rxjs';

import * as fromStore from 'src/app/store';
import { Store } from '@ngrx/store';
import { DirectMessageStateModel } from 'src/app/store/_model/directMessageStateModel';
import { AuthService } from 'src/app/core/_services/auth/auth.service';

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
  dmState$: Observable<DirectMessageStateModel>;
  connected: boolean;
  message = '';
  //***********
  constructor(private authService: AuthService, private store: Store<fromStore.State>) {
    this.dmState$ = this.store.select<DirectMessageStateModel>(state => state.directMessage);
    this.subManager.add(
      this.store.select<DirectMessageStateModel>(state => state.directMessage).subscribe(data => {
        this.connected = data.dm.connected;
        console.log(data.dm);
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
    console.log('send message to : ' + this.selectedOnlineUserName + ' : ' + this.message);
    this.store.dispatch(new fromStore.SendDirectMessage(this.message, this.onlineUser.userName))
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
  disConnect() {
    this.store.dispatch(new fromStore.Leave());
  }
}
