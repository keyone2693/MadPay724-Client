import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserInfo } from 'src/app/data/models/common/chat/userInfo';
import { DirectMessage } from 'src/app/data/models/common/chat/directMessage';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/_services/auth/auth.service';
import { StyleScriptService } from 'src/app/core/_services/common/styleScript.service';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy  {
  url = '';
  isAdmin = 0;
  constructor(private authService: AuthService, private styleScriptService: StyleScriptService) {
    if (this.authService.roleMatch(['Admin'])) {
      this.isAdmin = 1;
    } else if (this.authService.roleMatch(['User'])) {
      this.isAdmin = 2;
    }
    this.styleScriptService.addScript("notification-sidebar", './assets/js/notification-sidebar.js');

  }
  ngOnInit() {

  }
  ngOnDestroy() {
    this.styleScriptService.removeScript("notification-sidebar");

  }
}
