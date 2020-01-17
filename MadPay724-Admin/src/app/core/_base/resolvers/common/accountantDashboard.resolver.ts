import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DashboardService } from 'src/app/core/_services/common/dashboard.service';
import { AccountantDashboard } from 'src/app/data/models/common/accountantDashboard';

@Injectable()
export class AccountantDashboardResolver implements Resolve<AccountantDashboard> {
    constructor(private dashboardService: DashboardService, private router: Router,
                private alertService: ToastrService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<AccountantDashboard> {
        return this.dashboardService.getAccountantDashboard().pipe(
            catchError(error => {
                this.alertService.error(error, 'خطا');
                return of(null);
            })
        );
    }
}
