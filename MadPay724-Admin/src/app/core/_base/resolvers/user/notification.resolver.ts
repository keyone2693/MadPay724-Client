import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/core/_services/auth/auth.service';
import { NotificationService } from 'src/app/core/_services/panel/user/notification.service';
import { Notify } from 'src/app/data/models/notify';

@Injectable()
export class NotificationResolver implements Resolve<Notify> {
    constructor(private notifyService: NotificationService, private router: Router,
                private alertService: ToastrService, private authService: AuthService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Notify> {
        return this.notifyService.getNotify(this.authService.decodedToken.nameid).pipe(
            catchError(error => {
                this.alertService.error('خطا دردریافت اطلاعات', 'خطا');
                this.router.navigate([this.authService.getDashboardUrl()]);
                return of(null);
            })
        );
    }
}
