import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment.prod';
import { Observable, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { User } from 'src/app/data/models/user';
import { AuthService as SocialAuthService, SocialUser } from "angularx-social-login";

import * as fromStore from '../../../store';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  subManager = new Subscription();
  //***********
  baseUrl = environment.apiUrl + environment.apiV1 + 'site/panel/auth/';
  jwtHelper = new JwtHelperService();
  userRoles: string[] = [];
  userName: string = '';

  constructor(private http: HttpClient, private alertService: ToastrService,
    private router: Router, private socialAuthService: SocialAuthService,
    private store: Store<fromStore.State>) {
    const token = localStorage.getItem('token');
    if (this.loggedIn()) {
      const decode = this.jwtHelper.decodeToken(token);
      this.userRoles = decode.role as Array<string>;
      this.userName = decode.unique_name;
    }
  }
  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((user: any) => {
        if (user) {
          //store
          this.store.dispatch(new fromStore.EditLoggedUser(user.user));
          const decodedToken = this.jwtHelper.decodeToken(user.token);
          this.store.dispatch(new fromStore.EditDecodedToken(decodedToken));
          this.userRoles = decodedToken.role as Array<string>;

          localStorage.setItem('token', user.token);
          localStorage.setItem('refreshToken', user.refresh_token);
        }
      })
    );
  }
  loginWithSocial(userName: string, provider: string) {
    return this.http.post(this.baseUrl + 'login', { provider: provider, grantType: 'social', userName: userName }).pipe(
      map((user: any) => {
        if (user) {
          //store
          this.store.dispatch(new fromStore.EditLoggedUser(user.user));
          const decodedToken = this.jwtHelper.decodeToken(user.token);
          this.store.dispatch(new fromStore.EditDecodedToken(decodedToken));
          this.userRoles = decodedToken.role as Array<string>;

          localStorage.setItem('token', user.token);
          localStorage.setItem('refreshToken', user.refresh_token);
        }
      })
    );
  }
  getVerificationCode(mobile: string) {
    return this.http.post(this.baseUrl + 'code', { mobile: mobile });
  }
  register(user: any) {
    return this.http.post(this.baseUrl + 'register', user);
  }
  registerWithSocial(user: any) {
    return this.http.post(this.baseUrl + 'register/social', user);
  }
  loggedIn() {
    var user: User;
    this.subManager.add(
      this.store.select(fromStore.getLoggedUserState).subscribe((data) => {
        user = data;
      })
    );

    const token = localStorage.getItem('token');
    if (token == null || token == undefined) {
      return false;
    }
    var parts = token.split('.');
    if (parts.length !== 3) {
      return false;
    }
    var decoded = this.jwtHelper.urlBase64Decode(parts[1]);
    if (!decoded) {
      return false;
    }
    if (user.provider === 'GOOGLE' || user.provider === 'FACEBOOK') {
      var socialUser: SocialUser;
      this.socialAuthService.authState.subscribe((user) => {
        socialUser = user;
      });
      if (socialUser == null) {
        return false
      }
    }
    return true
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('dm');
    this.store.dispatch(new fromStore.ResetDecodedToken());
    this.store.dispatch(new fromStore.ResetLoggedUser());
    this.userRoles = [];
    //
    this.subManager.add(
      this.store.select(fromStore.getLoggedUserState).subscribe((data) => {
        if (data.provider === 'GOOGLE' || data.provider === 'FACEBOOK') {
          this.socialAuthService.signOut()
        }
      })
    );
    
    this.router.navigate(['/auth/login']);
    this.alertService.warning('با موفقیت خارج شدید', 'موفق');
  }
  logoutRefreshToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    this.store.dispatch(new fromStore.ResetDecodedToken());
    this.store.dispatch(new fromStore.ResetLoggedUser());
    this.userRoles = [];
    //
    this.subManager.add(
      this.store.select(fromStore.getLoggedUserState).subscribe((data) => {
        if (data.provider === 'GOOGLE' || data.provider === 'FACEBOOK') {
          this.socialAuthService.signOut()
        }
      })
    );
    this.router.navigate(['/auth/login']);
    this.alertService.error('خطا در اعتبار سنجی خودکار', 'خطا');
    this.alertService.warning('با موفقیت خارج شدید', 'موفق');
  }

  getNewRefreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refreshToken');
    const granttype = 'refresh_token';
    const username = this.userName;
    return this.http.post<any>(this.baseUrl + 'login', { username, refreshToken, granttype }).pipe(
      map(result => {
        if (result && result.token) {
          localStorage.setItem('token', result.token);
          const decodedToken = this.jwtHelper.decodeToken(result.token);
          this.store.dispatch(new fromStore.EditDecodedToken(decodedToken));
          this.userRoles = decodedToken.role as Array<string>;
        }
        return result as any;
      })
    );
  }
  isAuthorized(): boolean {
    const token = localStorage.getItem('token');
    if (!this.jwtHelper.isTokenExpired(token)) {
      var user: User;
      this.subManager.add(
        this.store.select(fromStore.getLoggedUserState).subscribe((data) => {
          user = data;
        })
      );
      if (user.provider === 'GOOGLE' || user.provider === 'FACEBOOK') {
        var socialUser: SocialUser;
        this.socialAuthService.authState.subscribe((user) => {
          socialUser = user;
        });
        if (socialUser == null) {
          return false
        }
      }
      return true
    } else {
      return false;
    }
    
  }
  isAdmin(): boolean {
    if (this.roleMatch(["Admin"])) {
      return true;
    }
    return false;
  }
  roleMatch(allowedRoles): boolean {
    let isMatch = false;
    const userRoles = this.userRoles;
    if (Array.isArray(userRoles)) {
      allowedRoles.forEach(element => {
        if (userRoles.includes(element)) {
          isMatch = true;
          return;
        }
      });
    } else {
      allowedRoles.forEach(element => {
        if (userRoles === element) {
          isMatch = true;
          return;
        }
      });
    }
    return isMatch;
  }
  getDashboardUrl(): string {
    const userRoles = this.userRoles;
    if (Array.isArray(userRoles)) {
      if (userRoles.includes('Admin')) {
        return 'panel/common/admin/dashboard';
      } else if (userRoles.includes('Accountant')) {
        return 'panel/common/accountant/dashboard';
      } else if (userRoles.includes('Blog') || userRoles.includes('AdminBlog')) {
        return 'panel/common/blog/dashboard';
      } else {
        return 'panel/common/user/dashboard';
      }
    } else {
      if (userRoles === 'Admin') {
        return 'panel/common/admin/dashboard';
      } else if (userRoles === 'Accountant') {
        return 'panel/common/accountant/dashboard';
      } else if (userRoles === 'Blog' || userRoles === 'AdminBlog') {
        return 'panel/common/blog/dashboard';
      } else {
        return 'panel/common/user/dashboard';
      }
    }

  }

}
