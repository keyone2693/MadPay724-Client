import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { EasyPayService } from 'src/app/Services/panel/user/easyPay.service';
import { EasyPayGatesWallets } from 'src/app/models/user/easyPayGatesWallets';

@Injectable()
export class EasyPayEditResolver implements Resolve<EasyPayGatesWallets> {
    constructor(private easypayService: EasyPayService, private router: Router,
        private alertService: ToastrService, private authService: AuthService) { }
    resolve(route: ActivatedRouteSnapshot): Observable<EasyPayGatesWallets> {
        return this.easypayService.getEasyPayGatesWallets(this.authService.decodedToken.nameid, route.params['easypayId']).pipe(
            catchError(error => {
                this.alertService.error(error, 'خطا');
                this.router.navigate(['/panel/user/easypay']);
                return of(null);
            })
        );
    }
}
