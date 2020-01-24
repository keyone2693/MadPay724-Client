import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './core/_services/auth/auth.service';
import { TitleService } from './core/_services/common/title.service';
import { Store } from '@ngrx/store';
import * as fromStore from './store';

import { HubConnection } from '@microsoft/signalr';

import * as signalR from '@microsoft/signalr'
import { environment } from 'src/environments/environment.prod';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  jwtHelper = new JwtHelperService();
  _hubConnection: HubConnection | undefined;
  message = '';
  messages: string[] = [];



  constructor(private authService: AuthService,
    private titleService: TitleService, private store: Store<fromStore.State>) {
    this.getDecodedToken();
    this.configSignalR();
  }
  ngOnInit() {
    this.titleService.init();
  } 
  getDecodedToken() {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      this.store.dispatch(new fromStore.EditDecodedToken(decodedToken));
    }
  }

  configSignalR() {
    this._hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.apiUrl + environment.apiV1 + 'site/panel/chat')
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this._hubConnection.start().catch(err => console.error(err.toString()));

    this._hubConnection.on('Send', (data: any) => {
      const received = `Received: ${data}`;
      console.log(received);
      this.messages.push(received)
    })
  }
  sendMesage() {
    const data = `Sent: ${this.message}`;

    if (this._hubConnection) {
      this._hubConnection.invoke('Send', data);
    }
    console.log(data);
    this.messages.push(data);
  }

}
