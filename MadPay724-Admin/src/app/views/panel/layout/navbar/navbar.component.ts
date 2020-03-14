import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
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
  styleUrls: ['./navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
  
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
  allMessageNotifications(directMessages: DirectMessage[]): number {
      if (directMessages != null && directMessages != undefined) {
        return directMessages.filter(p => !p.isRead).length;
      }
    
    return 0;
  }

  onChatClick(directMessages: DirectMessage[]) {
      if (this.authService.roleMatch(["User"])) {
        let dmArr: DirectMessage[] = [];
        directMessages.forEach(el => {
          el.isRead = true;
          dmArr.push(el);
        });
        //
        this.store.dispatch(new fromStore.JoinSent(dmArr));
      }

  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('dm');
    this.store.dispatch(new fromStore.ResetDecodedToken());
    this.store.dispatch(new fromStore.ResetLoggedUser());
    this.authService.userRoles = [];

    this.store.dispatch(new fromStore.Leave());

    this.router.navigate(['/auth/login']);
    this.alertService.warning('با موفقیت خارج شدید', 'موفق');
  }
}
