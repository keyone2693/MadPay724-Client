import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserDashboard } from 'src/app/data/models/common/userDashboard';
import { DashboardService } from 'src/app/core/_services/common/dashboard.service';
import { AdminDashboard } from 'src/app/data/models/common/adminDashboard';

@Injectable()
export class AdminDashboardResolver implements Resolve<AdminDashboard> {
    constructor(private dashboardService: DashboardService, private router: Router,
                private alertService: ToastrService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<AdminDashboard> {
        return this.dashboardService.getAdminDashboard().pipe(
            catchError(error => {
                this.alertService.error(error, 'خطا');
                return of(null);
            })
        );
    }
}
