import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user';
import { BehaviorSubject, Observable } from 'rxjs';


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

  constructor(private http: HttpClient) { }

  changeUserPhoto(photoUrl: string) {
    this.photoUrl.next(photoUrl);
  }
  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((resp: any) => {
        const user = resp;
        if (user) {
          localStorage.setItem('token', user.token);
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
    return !this.jwtHelper.isTokenExpired(token);
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.decodedToken = null;
    this.currentUser = null;
  }

getNewRefreshToken(): Observable<any> {
  const user: User = JSON.parse(localStorage.getItem('user'));
  const userName = user.userName;
  const refreshToken = localStorage.getItem('refreshToken');
  const grantType = 'refresh_token';

  return this.http.post(this.baseUrl + 'login', {userName, refreshToken, grantType}).pipe(
    map((result: any) => {
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
    allowedRoles.forEach(element => {
      if (userRoles.includes(element)) {
        isMatch = true;
        return;
      }
    });
    return isMatch;
  }

  getDashboardUrl(): string {
    const userRoles = this.decodedToken.role as Array<string>;
    if (userRoles.includes('Admin')) {
      return 'panel/admin/dashboard';
    } else if (userRoles.includes('Accountant')) {
      return 'panel/accountant/dashboard';
    } else if (userRoles.includes('Blog')) {
      return 'panel/blog/dashboard';
    } else {
      return 'panel/user/dashboard';
    }
  }

}
