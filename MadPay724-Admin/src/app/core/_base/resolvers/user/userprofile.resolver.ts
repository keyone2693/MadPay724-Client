import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from 'src/app/data/models/user';
import { UserService } from 'src/app/core/_services/panel/user.service';
import { AuthService } from 'src/app/core/_services/auth/auth.service';

@Injectable()
export class UserProfileResolver implements Resolve<User> {
    constructor(private userService: UserService, private router: Router,
                private alertService: ToastrService,private authService: AuthService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this.userService.getUser().pipe(
            catchError(error => {
                this.alertService.error('خطا دردریافت اطلاعات', 'خطا');
                this.router.navigate([this.authService.getDashboardUrl()]);
                return of(null);
            })
        );
    }
}