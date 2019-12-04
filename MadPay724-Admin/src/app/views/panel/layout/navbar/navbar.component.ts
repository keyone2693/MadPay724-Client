import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/_services/auth/auth.service';
import { User } from 'src/app/data/models/user';
import { Store } from '@ngrx/store';

import * as fromStore from '../../../../store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  photoUrl: string;
  user$: Observable<User>;
  constructor(private router: Router,
    private alertService: ToastrService,
    public authService: AuthService,
    private store: Store<fromStore.State>) {
  }

  ngOnInit() {
    this.user$ = this.store.select(fromStore.getLoggedUserState);
    //
    this.authService.currentPhotoUrl.subscribe(pu => this.photoUrl = pu);
    this.loadUser();
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    this.store.dispatch(new fromStore.ResetDecodedToken());
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
