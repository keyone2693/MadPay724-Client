import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GateWallets } from 'src/app/data/models/user/gateWallets';
import { GatesService } from 'src/app/core/_services/panel/user/gateService.service';

@Injectable()
export class GateEditResolver implements Resolve<GateWallets> {
    constructor(private gateService: GatesService, private router: Router,
                private alertService: ToastrService) { }
    resolve(route: ActivatedRouteSnapshot): Observable<GateWallets> {
        return this.gateService.getGate(route.params['gateId']).pipe(
            catchError(error => {
                this.alertService.error(error, 'خطا');
                this.router.navigate(['/panel/user/gate']);
                return of(null);
            })
        );
    }
}
