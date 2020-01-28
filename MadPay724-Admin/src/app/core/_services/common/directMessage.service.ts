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


@Injectable({
  providedIn: 'root'
})
export class DirectMessageService implements OnDestroy {
  subManager = new Subscription();


  _hubConnection: HubConnection | undefined;
  headers: HttpHeaders | undefined;

  constructor(private authService: AuthService,private store: Store<fromStore.State>) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Content-Type', 'application/json');
    this.headers = this.headers.set('Accept', 'application/json');

    this.init();

  }
  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
  sendDirectMessage(message: string, userId: string): string {
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
      this.store.dispatch(new fromStore.ReceivedNewOnlineUser(onlineUser));
    });

    this._hubConnection.on('OnlineUsers', (onlineUsers: UserInfo[]) => {
      this.store.dispatch(new fromStore.ReceivedOnlineUsers(onlineUsers));
    });

    this._hubConnection.on('Joined', (onlineUser: UserInfo) => {
      this.store.dispatch(new fromStore.JoinSent());
    });

    this._hubConnection.on('UserLeft', (name: string) => {
      this.store.dispatch(new fromStore.ReceivedUserLeft(name));
    });

    this._hubConnection.on('SendDirectMessage', (message: string, onlineUser: UserInfo) => {
      this.store.dispatch(new fromStore.ReceivedDirectMessage(message, onlineUser));
    });

  }
}
