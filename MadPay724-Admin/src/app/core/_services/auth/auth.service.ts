import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { User } from 'src/app/data/models/user';

import * as fromStore from '../../../store';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + environment.apiV1 + 'site/panel/auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: User;
  photoUrl = new BehaviorSubject<string>('../../../assets/img/profilepic.png');
  currentPhotoUrl = this.photoUrl.asObservable();

  constructor(private http: HttpClient, private alertService: ToastrService,
    private router: Router,
    private store: Store<fromStore.State>) { }

  changeUserPhoto(photoUrl: string) {
    this.photoUrl.next(photoUrl);
  }
  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((resp: any) => {
        const user = resp;
        if (user) {
          //store
          this.store.dispatch(new fromStore.EditLoggedUser(user.user));
          const detoken = this.jwtHelper.decodeToken(user.token);
          this.store.dispatch(new fromStore.EditDecodedToken(detoken));

          localStorage.setItem('token', user.token);
          localStorage.setItem('refreshToken', user.refresh_token);
          localStorage.setItem('user', JSON.stringify(user.user));
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          this.currentUser = user.user;
          this.changeUserPhoto(this.currentUser.photoUrl);
        }
      })
    );
  }
  register(user: User) {
    return this.http.post(this.baseUrl + 'register', user);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    // tslint:disable-next-line: triple-equals
    if (token != null || token != undefined) {
      return true; // !this.jwtHelper.isTokenExpired(token);
    } else {
      return false;
    }
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('refreshToken');
    this.decodedToken = null;
    this.currentUser = null;
    this.router.navigate(['/auth/login']);
    this.alertService.warning('با موفقیت خارج شدید', 'موفق');
  }
  logoutRefreshToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('refreshToken');
    this.decodedToken = null;
    this.currentUser = null;
    this.router.navigate(['/auth/login']);
    this.alertService.error('خطا در اعتبار سنجی خودکار', 'خطا');
    this.alertService.warning('با موفقیت خارج شدید', 'موفق');
  }

getNewRefreshToken(): Observable<any> {
  const user: User = JSON.parse(localStorage.getItem('user'));
  const username = user.userName;
  const refreshToken = localStorage.getItem('refreshToken');
  const granttype = 'refresh_token';
  return this.http.post<any>(this.baseUrl + 'login', {username, refreshToken, granttype}).pipe(
    map(result => {
      if (result && result.token) {
        localStorage.setItem('token', result.token);
       // localStorage.setItem('refreshToken', result.refresh_token);
       // localStorage.setItem('user', JSON.stringify(result.user));
        this.decodedToken = this.jwtHelper.decodeToken(result.token);
      //  this.currentUser = result.user;
      //  this.changeUserPhoto(this.currentUser.photoUrl);
      }
      return result as any;
    })
  );

}


  roleMatch(allowedRoles): boolean {
    let isMatch = false;
    const userRoles = this.decodedToken.role as Array<string>;
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
    const userRoles = this.decodedToken.role as Array<string>;

    if (Array.isArray(userRoles)) {
      if (userRoles.includes('Admin')) {
        return 'panel/admin/dashboard';
      } else if (userRoles.includes('Accountant')) {
        return 'panel/accountant/dashboard';
      } else if (userRoles.includes('Blog') || userRoles.includes('AdminBlog')) {
        return 'panel/blog/dashboard';
      } else {
        return 'panel/user/dashboard';
      }
    } else {
      if (userRoles === 'Admin') {
        return 'panel/admin/dashboard';
      } else if (userRoles === 'Accountant') {
        return 'panel/accountant/dashboard';
      } else if (userRoles === 'Blog' || userRoles === 'AdminBlog') {
        return 'panel/blog/dashboard';
      } else {
        return 'panel/user/dashboard';
      }
    }
    
  }

}
