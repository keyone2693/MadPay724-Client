import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DashboardService } from 'src/app/core/_services/common/dashboard.service';
import { BlogDashboard } from 'src/app/data/models/common/blogDashboard';

@Injectable()
export class BlogDashboardResolver implements Resolve<BlogDashboard> {
    constructor(private dashboardService: DashboardService, private router: Router,
                private alertService: ToastrService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<BlogDashboard> {
        return this.dashboardService.getBlogDashboard().pipe(
            catchError(error => {
                this.alertService.error(error, 'خطا');
                return of(null);
            })
        );
    }
}
