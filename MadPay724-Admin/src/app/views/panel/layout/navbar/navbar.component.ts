import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/_services/auth/auth.service';
import { User } from 'src/app/data/models/user';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { HelloMessageState } from 'src/app/store/helloMessage/helloMessageState';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  photoUrl: string;
  helloMessage$: Observable<string>;
  constructor(private router: Router, private store: Store<HelloMessageState>,
    private alertService: ToastrService, public authService: AuthService) {
  }

  ngOnInit() {
    this.helloMessage$ = this.store.select('helloMessage');
    this.authService.currentPhotoUrl.subscribe(pu => this.photoUrl = pu);
    this.loadUser();
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.router.navigate(['/auth/login']);
    this.alertService.warning('با موفقیت خارج شدید', 'موفق');
  }
  loadUser() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.authService.currentUser = user;
      this.authService.changeUserPhoto(user.photoUrl);
    }
  }
}
