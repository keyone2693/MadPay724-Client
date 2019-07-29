import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../models/user';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../Services/auth/auth.service';
import { UserService } from '../Services/panel/user.service';

@Injectable()
export class UserProfileResolver implements Resolve<User> {
    constructor(private userService: UserService, private router: Router,
                private alertService: ToastrService, private authService: AuthService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this.userService.getUser(this.authService.decodedToken.nameid).pipe(
            catchError(error => {
                this.alertService.error('خطا دردریافت اطلاعات', 'خطا');
                this.router.navigate(['/panel/userinfo/profile']);
                return of(null);
            })
        );
    }
}