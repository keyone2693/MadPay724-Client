import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HomeService } from 'src/app/core/_services/home/home.service';
import { HomeData } from 'src/app/data/models/home/homeData';
import { ApiReturn } from 'src/app/data/models/common/apiReturn';


@Injectable()
export class HomeResolver implements Resolve<ApiReturn<HomeData>> {
    constructor(private homeService: HomeService, private router: Router,
        private alertService: ToastrService) { }
    resolve(route: ActivatedRouteSnapshot): Observable<ApiReturn<HomeData>> {
        return this.homeService.getHomeData().pipe(
            catchError(error => {
                this.alertService.error(error, 'خطا');
                this.router.navigate(['']);
                return of(null);
            })
        );
    }
}
