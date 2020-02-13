import { Component, OnInit, } from '@angular/core';
import { UserInfo } from 'src/app/data/models/common/chat/userInfo';
import { DirectMessage } from 'src/app/data/models/common/chat/directMessage';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/_services/auth/auth.service';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  url = '../../../../../assets/js/notification-sidebar.js';
  loadAPI: any;
  isAdmin = 0;
  constructor(private authService: AuthService) {
    if (this.authService.roleMatch(['Admin'])) {
      this.isAdmin = 1;
    } else if (this.authService.roleMatch(['User'])) {
      this.isAdmin = 2;
    }
  }
  ngOnInit() {
    this.loadAPI = new Promise(resolve => {
      this.loadScript();
    });
  }
  loadScript() {
    const node = document.createElement('script');
    node.src = this.url;
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
  }
}
