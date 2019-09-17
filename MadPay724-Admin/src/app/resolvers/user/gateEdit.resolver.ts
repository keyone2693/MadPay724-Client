import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { Gate } from 'src/app/models/user/gate';
import { GatesService } from 'src/app/Services/panel/user/gateService.service';
import { GatesWallets } from 'src/app/models/user/gatesWallets';
import { GateWallets } from 'src/app/models/user/gateWallets';

@Injectable()
export class GateEditResolver implements Resolve<GateWallets> {
    constructor(private gateService: GatesService, private router: Router,
                private alertService: ToastrService, private authService: AuthService) { }
    resolve(route: ActivatedRouteSnapshot): Observable<GateWallets> {
        return this.gateService.getGate(this.authService.decodedToken.nameid, route.params['gateId']).pipe(
            catchError(error => {
                this.alertService.error(error, 'خطا');
                this.router.navigate(['/panel/user/gate']);
                return of(null);
            })
        );
    }
}
