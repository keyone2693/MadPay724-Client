import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { Gate } from 'src/app/models/user/gate';
import { GatesService } from 'src/app/Services/panel/user/gateService.service';
import { GatesWallets } from 'src/app/models/user/gatesWallets';

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
