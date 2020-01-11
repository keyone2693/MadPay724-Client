import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FactorDetail } from 'src/app/data/models/accountant/factorDetail';
import { UserFactorService } from 'src/app/core/_services/panel/user/userFactor.service';


@Injectable()
export class UserFactorResolver implements Resolve<FactorDetail> {
    constructor(private factorService: UserFactorService,
                private alertService: ToastrService) { }
    resolve(route: ActivatedRouteSnapshot): Observable<FactorDetail> {
        return this.factorService.getFactor(route.params['factorId']).pipe(
            catchError(error => {
                this.alertService.error(error, 'خطا');
                return of(null);
            })
        );
    }
}
