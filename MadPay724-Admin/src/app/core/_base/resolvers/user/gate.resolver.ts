import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GatesWallets } from 'src/app/data/models/user/gatesWallets';
import { GatesService } from 'src/app/core/_services/panel/user/gateService.service';
import { AuthService } from 'src/app/core/_services/auth/auth.service';

@Injectable()
export class GateResolver implements Resolve<GatesWallets> {
    constructor(private gateService: GatesService,
                private alertService: ToastrService, private authService: AuthService) { }
    resolve(route: ActivatedRouteSnapshot): Observable<GatesWallets> {
        return this.gateService.getGates(this.authService.decodedToken.nameid).pipe(
            catchError(error => {
                this.alertService.error(error, 'خطا');
                return of(null);
            })
        );
    }
}
