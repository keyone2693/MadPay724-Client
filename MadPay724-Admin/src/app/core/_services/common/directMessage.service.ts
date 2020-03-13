import { Injectable, OnDestroy } from '@angular/core';
import { HubConnection } from '@microsoft/signalr';
import { HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

import * as signalR from '@microsoft/signalr'
import { environment } from 'src/environments/environment.prod';
import { UserInfo } from 'src/app/data/models/common/chat/userInfo';

import * as fromStore from 'src/app/store';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { DirectMessageSaveService } from './directMessageSave.service';
import { DirectMessage } from 'src/app/data/models/common/chat/directMessage';


@Injectable({
  providedIn: 'root'
})
export class DirectMessageService implements OnDestroy {
  subManager = new Subscription();


  _hubConnection: HubConnection | undefined;
  headers: HttpHeaders | undefined;

  constructor(private authService: AuthService, private store: Store<fromStore.State>,
    private alertService: ToastrService, private cookieService: CookieService,
    private dmSaveService: DirectMessageSaveService) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Content-Type', 'application/json');
    this.headers = this.headers.set('Accept', 'application/json');

    this.init();

  }
  go() {
    const allCookies: {} = this.cookieService.getAll();
  }
  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
  loadOnlineUsers() {
     if (this._hubConnection) {
      this._hubConnection.invoke('LoadOnlineUsers');
    }
  }
  sendDirectMessage(message: string, userId: string,date:Date): string {
    const dMessage: DirectMessage = {
      message: message,
      fromOnlineUser: {
        userName: userId,
        connectionId: '-1'
      },
      date: date
    };
    this.dmSaveService.addToMessages(dMessage);

    if (this._hubConnection) {
      this._hubConnection.invoke('SendDirectMessage', message, userId);
    }
    return message;
  }
  leave() {
    if (this._hubConnection) {
      this._hubConnection.invoke('Leave');
    }
  }
  join() {
    if (this._hubConnection) {
      this._hubConnection.invoke('Join');
    }
  }

  init() {
      this.subManager.add(
        this.authService.getNewRefreshToken().subscribe(() => {
          this.initHub();
        })
    );
  }
  initHub() {
    const token = localStorage.getItem('token');
    this._hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.apiUrl + environment.apiV1 + 'site/panel/chat',
        { accessTokenFactory: () => token })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();
    this._hubConnection.start().catch(err => console.error(err.toString()));


    this._hubConnection.on('NewOnlineUser', (onlineUser: UserInfo) => {
      if (this.authService.isAdmin() && onlineUser.userName !== "admin@madpay724.com") {
        if (this.dmSaveService.isActiveConnect()) {
          this.alertService.success(' کاربر ' + onlineUser.userName + ' به گفت و گو پیوست ', 'توجه');
        }
      }
      this.store.dispatch(new fromStore.ReceivedNewOnlineUser(onlineUser));
    });

    this._hubConnection.on('OnlineUsers', (onlineUsers: UserInfo[]) => {
      console.log('OnlineUsers');
      console.log(onlineUsers);
      this.store.dispatch(new fromStore.ReceivedOnlineUsers(onlineUsers));
    });

    this._hubConnection.on('Joined', (onlineUser: UserInfo) => {
      const mess = this.dmSaveService.loadMessages();
      this.store.dispatch(new fromStore.JoinSent(mess.directMessages));
    });

    this._hubConnection.on('UserLeft', (name: string) => {
      if (this.authService.isAdmin() && name !== "admin@madpay724.com") {
        if (this.dmSaveService.isActiveConnect()) {
          this.alertService.warning(' کاربر ' + name + ' از گفت و گو خارج شد', 'توجه');
        }
      }

      this.store.dispatch(new fromStore.ReceivedUserLeft(name));
    });

    this._hubConnection.on('SendDirectMessage', (message: string, onlineUser: UserInfo, date: Date) => {
      const dMessage: DirectMessage = {
        message: message,
        fromOnlineUser: onlineUser,
        date: date
      };
      this.dmSaveService.addToMessages(dMessage);
      //
      if (this.dmSaveService.isActiveMessage()) {
        if (onlineUser.userName === "admin@madpay724.com") {
          this.alertService.warning(' از پشتیبان  پیغامی دارید ', 'پیام جدید');

        } else{
          this.alertService.warning(' از کاربر ' + onlineUser.userName + ' پیغامی دارید ', 'پیام جدید');
        }
      }
      this.store.dispatch(new fromStore.ReceivedDirectMessage(message, onlineUser, date));
    });

  }
}
