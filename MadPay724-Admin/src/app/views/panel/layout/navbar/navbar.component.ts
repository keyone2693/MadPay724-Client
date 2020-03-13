import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/_services/auth/auth.service';
import { User } from 'src/app/data/models/user';
import { Store } from '@ngrx/store';

import * as fromStore from '../../../../store';
import { Observable, Subscription } from 'rxjs';
import { DirectMessage } from 'src/app/data/models/common/chat/directMessage';
import 'src/app/shared/extentions/number.extentions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnDestroy {
  user$: Observable<User>;
  subManager = new Subscription();
  directMessages$: Observable<DirectMessage[]>;
  constructor(private router: Router,
    private alertService: ToastrService,
    public authService: AuthService,
    private store: Store<fromStore.State>) {
    
    this.directMessages$ = this.store.select(fromStore.getDirectMessages);
    this.store.dispatch(new fromStore.LoadNotification());
    this.user$ = this.store.select(fromStore.getLoggedUserState);
    //
    this.loaduser();
  }

  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
  loaduser() {
    let loadNeeded = false;
    this.subManager.add(
      this.store.select(fromStore.getLoggedUserId).subscribe(data => {        
        if (data != null && data != undefined) {
          if (data.trim() === '') {
            loadNeeded = true
          }
        } else {
          loadNeeded = true
        }
      })

    );
    if (loadNeeded) {
      this.store.dispatch(new fromStore.LoadLoggedUser());
    }
  }
  allMessageNotifications(): number {
    let dss = 0;
    this.subManager.add(
      this.directMessages$.subscribe(data => {
        const arr = data.filter(p => !p.isRead);
       dss = arr.length;
      })
    );
    return dss;
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    this.store.dispatch(new fromStore.ResetDecodedToken());
    this.store.dispatch(new fromStore.ResetLoggedUser());
    this.authService.userRoles = [];

    this.store.dispatch(new fromStore.Leave());

    this.router.navigate(['/auth/login']);
    this.alertService.warning('با موفقیت خارج شدید', 'موفق');
  }
}
