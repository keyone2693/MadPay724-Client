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
  //***********
  constructor(private authService: AuthService,private alertService: ToastrService,
    private store: Store<fromStore.State>) {   
    
    
    this.onlineUsers$ = this.store.select(fromStore.getOnlineUsers);
    this.dmState$ = this.store.select(fromStore.getDirectMessageStateContainer);
    this.subManager.add(
      this.store.select(fromStore.getConnected).subscribe(data => {
        this.connected = data;
      })
    );
  }
  ngOnInit() {
    this.connect();
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
      this.alertService.warning('کاربری انتخاب نشده است','ناموفق')
    }
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
  isUser(directMessage: DirectMessage) {
    if (directMessage.fromOnlineUser) {
      return true
    }
    return false;
  }
  backToUserList() {
    this.selectedOnlineUserName = '';
  }

}
