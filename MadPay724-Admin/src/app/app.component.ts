import { Component, OnInit } from '@angular/core';
import { AuthService } from './Services/auth/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TitleService } from './Services/common/title.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  jwtHelper = new JwtHelperService();

  constructor(private authService: AuthService, private titleService: TitleService) { }

  ngOnInit() {
    this.titleService.init();
    this.getDecodedToken();
  }

  getDecodedToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
  }
}
