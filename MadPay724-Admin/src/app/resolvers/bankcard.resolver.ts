import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../Services/auth/auth.service';
import { BankCard } from '../models/bankcard';
import { BankCardsService } from '../Services/panel/user/bankCards.service';

@Injectable()
export class BankCardResolver implements Resolve<BankCard[]> {
    constructor(private cardService: BankCardsService, private router: Router,
                private alertService: ToastrService, private authService: AuthService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<BankCard[]> {
        return this.cardService.getBankCards(this.authService.decodedToken.nameid).pipe(
            catchError(error => {
                this.alertService.error('خطا دردریافت اطلاعات', 'خطا');
                this.router.navigate([this.authService.getDashboardUrl()]);
                return of(null);
            })
        );
    }
}
