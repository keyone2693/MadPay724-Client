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
  user$: Observable<User>;
  constructor(private router: Router,
    private alertService: ToastrService,
    public authService: AuthService,
    private store: Store<fromStore.State>) {
  }

  ngOnInit() {
    this.user$ = this.store.select(fromStore.getLoggedUserState);
    //
    this.loadUser();
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    this.store.dispatch(new fromStore.ResetDecodedToken());
    this.store.dispatch(new fromStore.ResetLoggedUser());
    this.authService.userRoles = [];
    this.router.navigate(['/auth/login']);
    this.alertService.warning('با موفقیت خارج شدید', 'موفق');
  }
  loadUser() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (user) {
      console.log("navbar");
      
    }
  }
}
