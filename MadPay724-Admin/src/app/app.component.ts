import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './core/_services/auth/auth.service';
import { TitleService } from './core/_services/common/title.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  jwtHelper = new JwtHelperService();

  constructor(private authService: AuthService, private titleService: TitleService,
    private route: ActivatedRoute) { }

 
  ngOnInit() {
    this.titleService.init();
    this.getDecodedToken();    console.log(this.route.snapshot.paramMap.get('Authority'));

  }

  getDecodedToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
  }
}
