import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../../Services/auth/auth.service';
import { Wallet } from '../../models/wallet';
import { WalletService } from '../../Services/panel/user/wallet.service';

@Injectable()
export class WalletResolver implements Resolve<Wallet[]> {
    constructor(private walletService: WalletService,
                private alertService: ToastrService, private authService: AuthService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Wallet[]> {
        return this.walletService.getWallets(this.authService.decodedToken.nameid).pipe(
            catchError(error => {
                this.alertService.error(error, 'خطا');
                return of(null);
            })
        );
    }
}
